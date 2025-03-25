package com.example.atelier.service;

import com.example.atelier.domain.*;
import com.example.atelier.dto.OrderDTO;
import com.example.atelier.dto.PaymentDTO;
import com.example.atelier.repository.MembershipRepository;
import com.example.atelier.repository.PaymentRepository;
import com.example.atelier.repository.ReservationRepository;
import com.example.atelier.repository.UserRepository;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;
    private final ModelMapper modelMapper;
    private final MembershipRepository membershipRepository;
    private final MembershipServiceImpl membershipServiceImpl;

    private OrderService orderService;

    @Lazy
    @Autowired
    public void setOrderService(OrderService orderService) {
        this.orderService = orderService; // ✅ 순환 참조 방지
    }


    private final RestTemplate restTemplate;

    @Value("${iamport.api_key}")
    private String apiKey;

    @Value("${iamport.api_secret}")
    private String apiSecret;

    private IamportClient iamportClient;

    @PostConstruct //생성자초기화
    public void init() {
        this.iamportClient = new IamportClient(apiKey, apiSecret);
        log.info("✅ IamportClient initialized with API Key: {}", apiKey);
    }


    @Override
    public int createPayment(PaymentDTO paymentDTO) {
        // userId를 직접 Integer로 받도록 수정
        Integer userId = paymentDTO.getUserId();
        // 1. 사용자 조회
        User user = userRepository.findById(paymentDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // 2. 예약 조회
        Reservation reservation = reservationRepository.findById(paymentDTO.getReservationId())
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found"));

        // 3. 기본 결제 금액 설정
        BigDecimal finalAmount = paymentDTO.getAmount();

        // 4. 멤버십 조회 및 유효성 검사
        List<Membership> memberships = membershipRepository.findByUserId(userId);
        Membership membership = memberships.stream()
                .filter(m -> m.getStatus() == Membership.Status.ACTIVE)
                .findFirst()
                .orElse(null);

        Membership.Category membershipCategory = null;

        BigDecimal discountRate = BigDecimal.ZERO; // 기본값 0%적용

        if (membership != null) {
            // 유효 기간 확인 후 만료 처리
            if (membership.getValidUntil() != null && membership.getValidUntil().isBefore(LocalDateTime.now())) {
                membership.setStatus(Membership.Status.EXPIRED);
                membershipRepository.save(membership);
                //만료가 됐는데 다음 함수가 실행됐을 때 멤버십이 또 적용될 수 있으니 추후에 서비스로직 추가

            }
            // 활성 멤버십인 경우 할인 적용
            if (membership == null || membership.getStatus() != Membership.Status.ACTIVE) {
                log.warn("User ID {} has no active membership. Skipping discount.", user.getId());
            }else {
                // 멤버십 등급별 할인율 적용
                discountRate = membershipServiceImpl.getDiscountByMembershipCategory(membership.getCategory());
                //할인율을 결제 금액에 반영하는 과정
                BigDecimal discountAmount = finalAmount.multiply(discountRate);
                finalAmount = finalAmount.subtract(discountAmount);

                // 멤버십 카테고리 저장
                membershipCategory = membership.getCategory();
            }
        }
        // **결제 정보 생성** 이유는 알 수 없지만 builder로 해도 오류가 생겨서 아마도
        Payment payment = new Payment();
        payment.setUser(user);
        payment.setReservation(reservation);  // 필드명을 정확히 일치시킴
        payment.setMembership(membership);
        payment.setAmount(finalAmount);
        payment.setPaymentStatus(Payment.PaymentStatus.COMPLETED);
        payment.setPaymentMethod(paymentDTO.getPaymentMethod());
        payment.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        // **결제 정보 저장**
        payment = paymentRepository.save(payment);
        log.info("Payment saved: ID = {}, Amount = {}", payment.getId(), finalAmount);

        // **자동 승급 로직 실행**
        if (membership != null && membership.getStatus() == Membership.Status.ACTIVE) {
            membershipServiceImpl.upgradeMembershipIfEligible(membership,user);
        }

        //  **저장된 결제 ID 반환**
        return payment.getId();
    }

    //결제상태 조회
    @Override
    public Payment.PaymentStatus getPaymentStatus(Integer paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalArgumentException("결제를 찾을 수 없습니다."));
        return payment.getPaymentStatus();
    }

    //결제상태변경
    public void updatePaymentStatus(Integer paymentId, Payment.PaymentStatus newStatus) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalArgumentException("결제 내역을 찾을 수 없습니다."));

        if (payment.getPaymentStatus() == Payment.PaymentStatus.REFUNDED) {
            throw new IllegalStateException("이미 환불된 결제는 상태를 변경할 수 없습니다.");
        }

        payment.setPaymentStatus(newStatus);
        paymentRepository.save(payment);

        log.info("Payment ID {} - 결제 상태 변경: {}", paymentId, newStatus);
    }

    //결제방법 변경
    public void updatePaymentMethod(Integer paymentId, Payment.PaymentMethod newMethod) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalArgumentException("결제 내역을 찾을 수 없습니다."));

        if (payment.getPaymentStatus() != Payment.PaymentStatus.PENDING) {
            throw new IllegalStateException("진행 중인 결제만 결제 방법을 변경할 수 있습니다.");
        }

        payment.changePaymentMethod(newMethod); // 엔티티 내부의 메서드를 호출
        paymentRepository.save(payment);


        log.info("Payment ID {} - 결제 방법 변경: {}", paymentId, newMethod);
    }

    //환불페이지에 결제내역 보내기
    public void sendPaymentInfoToOrder(Integer paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalArgumentException("결제 내역을 찾을 수 없습니다."));

        if (payment.getPaymentStatus() != Payment.PaymentStatus.COMPLETED) {
            throw new IllegalStateException("완료된 결제만 주문으로 전송할 수 있습니다.");
        }

        // ModelMapper로 한 번에 변환
//        OrderDTO orderDTO = modelMapper.map(payment, OrderDTO.class);
        OrderDTO orderDTO = OrderDTO.builder()
                .paymentId(payment.getId())                   // Payment ID
                .userId(payment.getUser().getId())            // User ID
                .totalPrice(payment.getAmount())              // 결제(주문) 금액
                .paymentStatus(Order.PaymentStatus.COMPLETED) // 기본 상태
                .refundStatus(Order.RefundStatus.NONE)        // 환불 전이므로 NONE
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .build();

        // OrderService를 호출하여 주문 생성
        orderService.createOrder(orderDTO);
        log.info("Payment ID {} - 결제 정보가 OrderService로 전달됨", paymentId);

    }
    public void confirmPayment(Integer paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalArgumentException("Payment not found"));

        if (payment.getPaymentStatus() == Payment.PaymentStatus.COMPLETED) {
            log.warn("Payment ID {} is already COMPLETED", paymentId);
            return;
        }

//        // 외부 결제 승인 API 호출
//        String paymentApprovalUrl = "https://api.paymentgateway.com/payments/" + paymentId + "/approve";
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("Authorization", "Bearer your-api-key"); // API 키 필요할 경우
//
//        HttpEntity<String> requestEntity = new HttpEntity<>("{}", headers);
//
//
//        try {
//            ResponseEntity<String> response = restTemplate.exchange(paymentApprovalUrl, HttpMethod.POST, requestEntity, String.class);
//
//            if (!response.getStatusCode().is2xxSuccessful()) {
//                throw new RuntimeException("결제 승인 요청 실패: " + response.getBody());
//            }
//            log.info("결제 승인 성공: Payment ID = {}", paymentId);
//        } catch (Exception e) {
//            log.error("결제 승인 실패: Payment ID = {}, 오류: {}", paymentId, e.getMessage());
//            throw new RuntimeException("결제 승인 요청 실패");
//        }

        //결제상태 completed로 변경
        payment.setPaymentStatus(Payment.PaymentStatus.COMPLETED);
        Payment savedPayment = paymentRepository.save(payment);
        log.info("Payment saved, ID = {}, status updated to COMPLETED",
                savedPayment.getId());

        // 결제 완료 후 주문 정보 전송
        sendPaymentInfoToOrder(paymentId);

        // 누적 결제 금액 업데이트
        User user = payment.getUser();
        BigDecimal updatedTotal = user.getTotalSpent().add(payment.getAmount());
        user.setTotalSpent(updatedTotal);
        userRepository.save(user);
        log.info("🔄 Updated totalSpent for User ID {}: {}", user.getId(), updatedTotal);

    }

    @Override
    public PaymentDTO approvePayment(String impUid, PaymentDTO paymentDTO) {
        log.info("결제 승인 요청 시작: impUid = {}", impUid);

        try {
            // 1️⃣ PortOne API에서 결제 정보 조회
            IamportResponse<com.siot.IamportRestClient.response.Payment> response = iamportClient.paymentByImpUid(impUid);
            com.siot.IamportRestClient.response.Payment paymentResponse = response.getResponse();

            if (paymentResponse == null) {
                throw new IllegalArgumentException("유효하지 않은 결제 정보입니다.");
            }

            // 2️⃣ 결제 상태가 "paid"인지 확인 (PortOne API 기준)
            if (!"paid".equals(paymentResponse.getStatus())) {
                throw new IllegalArgumentException("결제가 완료되지 않았습니다.");
            }

            // 3️⃣ 결제 정보를 우리 DB에서 찾아 업데이트
            Payment payment = paymentRepository.findById(paymentDTO.getId())
                    .orElseThrow(() -> new IllegalArgumentException("결제 내역을 찾을 수 없습니다."));
            payment.setPaymentStatus(Payment.PaymentStatus.COMPLETED); // ✅ 우리 DB에서는 COMPLETED
            paymentRepository.save(payment);

            // 4️⃣ 주문 서비스에 결제 정보 전달
            sendPaymentInfoToOrder(payment.getId());

            log.info("✅ 결제 승인 완료: impUid = {}", impUid);
            return modelMapper.map(payment, PaymentDTO.class);
        } catch (IamportResponseException | IOException e) {
            log.error("❌ 결제 승인 실패: {}", e.getMessage());
            throw new RuntimeException("결제 승인 중 오류 발생");
        }
    }
}