package com.example.atelier.service;

import com.example.atelier.domain.*;
import com.example.atelier.dto.OrderDTO;
import com.example.atelier.dto.ReservationDTO;
import com.example.atelier.repository.OrderRepository;
import com.example.atelier.repository.PaymentRepository;
import com.example.atelier.repository.ReviewRepository;
import com.example.atelier.repository.UserRepository;
import com.google.gson.Gson;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.response.IamportResponse;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService{
    private final ModelMapper modelMapper;
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;




    //    private final Order order;
    private IamportClient iamportClient;
//    private  final Payment payment;

    @Value("${iamport.api_key}")
    private String apiKey;

    @Value("${iamport.api_secret}")
    private String apiSecret;

    @PostConstruct
    public void init() {
        this.iamportClient = new IamportClient(apiKey, apiSecret);
        log.info("✅ IamportClient initialized with API Key: {}", apiKey);
    }
    // 환불 생성
    @Override
    public int createOrder(Payment payment) {
        User user = payment.getUser();
        Reservation reservation = payment.getReservation();

        Order order = Order.builder()
                .payment(payment)
                .user(user)
                .reservation(reservation)
                .totalPrice(payment.getAmount())
                .paymentStatus(Order.PaymentStatus.COMPLETED)
                .refundStatus(Order.RefundStatus.NONE)
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .build();

        return orderRepository.save(order).getId();
    }

    // 주문 조회(직원,관리자모드)
    @Override
    public OrderDTO searchOrder(Integer id) {
        log.info("Order service searchOrder ------------------" + id);
        Optional<Order> result = orderRepository.findById(id);
        Order order = result.orElseThrow();
        return OrderDTO.fromEntity(order);
    }


    // 모든 주문조회(관리자모드)
    @Override
    public List<OrderDTO> searchAllOrder() {
        log.info("Order service searchAllOrder ------------------");
        List<OrderDTO> list = new ArrayList<>();
        List<Order> orderList = orderRepository.findAll();
        orderList.forEach(i -> list.add(modelMapper.map(i, OrderDTO.class)));
        return list;
    }

    // 특정 사용자의 주문 조회
    @Override
    public List<OrderDTO> searchOnlyOrder(Integer userId) {
        log.info("Order service searchOnlyOrder ------------------" + userId);
        List<Order> result = orderRepository.findByUserId(userId); // 엔티티 타입 전부 찾아오기
        List<OrderDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성
        result.forEach(i -> {
            OrderDTO data = modelMapper.map(i, OrderDTO.class); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });
        return resultDtoList;
    }

//   요청 관리자가 승인
    @Override
    public void approveRefund(Integer orderId, Integer staffId, String reason) {
        // Order 조회 및 상태 체크
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("주문 정보를 찾을 수 없습니다."));

        if (order.getRefundStatus() != Order.RefundStatus.REFUND_PENDING) {
            throw new IllegalStateException("환불 요청 상태가 아닙니다.");
        }


        // Payment 상태 변경 +결제취소로직 호출
        Payment payment = order.getPayment();
        if (payment.getPaymentStatus() != Payment.PaymentStatus.COMPLETED) {
            throw new IllegalStateException("결제 상태가 완료된 경우에만 환불할 수 있습니다.");
        }

        // 실제 아임포트 환불 호출 + 상태 업데이트
        boolean refundSuccess = refundPayment(payment.getId());

        if (!refundSuccess) {
            log.error("환불 실패: paymentId = {}", payment.getId());
            throw new RuntimeException("아임포트 환불 실패");
        }

        // Reservation 상태 변경(취소처리)
        Reservation reservation = payment.getReservation();
        reservation.changeStatus(Reservation.Status.CANCELLED);

        // Residence 상태 변경
        Residence residence = reservation.getResidence();
        residence.setStatus(Residence.Status.AVAILABLE);

        // Order 환불 상태 변경
        order.completeRefund();

    }

    //1단계 환불요청
    @Override
    public void requestRefund(Integer orderId, Integer userId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("주문 정보를 찾을 수 없습니다."));

        // 본인의 주문인지 체크
        if (!order.getUser().getId().equals(userId)) {
            throw new IllegalStateException("본인의 주문만 환불 요청이 가능합니다.");
        }

        //  리뷰 자동 삭제 로직 추가
        Reservation reservation = order.getReservation();
        Residence residence = reservation.getResidence();
        if (residence != null) {
            Integer residenceId = residence.getId();
            reviewRepository.deleteByUserIdAndResidenceId(userId, residenceId);
            log.info("리뷰 자동 삭제 완료 - userId: {}, residenceId: {}", userId, residenceId);
        }

        // 이미 구현된 엔티티의 환불 요청 메서드 호출
        order.requestRefund();
    }

    @Override
    public boolean refundPayment(Integer paymentId) {
        log.info(" 결제 환불 요청 시작: paymentId = {}", paymentId);

        //paymentId로 DB에서 최신 Payment 데이터를 조회하는 방식
        // 이 방식은 데이터 무결성과 최신 상태를 보장한다는 점에서 안전
        // 클라이언트나 다른 계층에서 전달된 Payment 객체의 데이터는 변조 가능성이 있고, 최신 상태가 아닐 수 있기 때문에, 항상 DB를 원본으로 조회하는 것이 바람직함.
        //DB 조회를 통해 결제 상태, 환불 가능 여부 등 중요한 비즈니스 로직을 정확하게 수행할 수 있으며,
        // 트랜잭션 내에서 일관성을 유지. 성능 최적화를 위해 캐시 등을 고려할 수는 있으나,
        // 보안과 데이터 신뢰성이 우선.

        //  결제 정보 가져오기
        //  Payment 정보 직접 조회
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalArgumentException("결제 정보를 찾을 수 없습니다."));

        // Payment에서 Order 정보 가져오기 (Order와 Payment가 양방향 관계인 경우)
        Order order = payment.getOrder();
        //  결제 상태 확인
        if (payment.getPaymentStatus() != Payment.PaymentStatus.COMPLETED) {
            log.warn(" Payment {} - 완료된 결제만 환불 가능합니다. 현재 상태: {}", paymentId, payment.getPaymentStatus());
            return false;
        }

        //  impUid 존재 확인
        String impUid = payment.getImpUid();
        log.info("impUid: {}", impUid);
        if (impUid == null || impUid.isEmpty()) {
            log.error(" Payment {} - 외부 결제 ID(impUid)가 없습니다.", paymentId);
            return false;
        }
        CancelData cancelData = new CancelData(impUid, true, payment.getAmount());
        cancelData.setReason("관리자 승인 환불");

        log.info("cancelData: {} ", cancelData);

        try {
            //PortOne API에 환불 요청
            log.info("paymentStatus: {} ",payment.getPaymentStatus());
            IamportResponse<com.siot.IamportRestClient.response.Payment> response =
                    iamportClient.cancelPaymentByImpUid(cancelData);
            log.info(" PortOne 응답 전체: {}", new Gson().toJson(response)); // 전체 JSON 구조 보기
            log.info(" PortOne 응답 코드: {}, 메시지: {}", response.getCode(), response.getMessage());

            if (response.getResponse() != null && "cancelled".equals(response.getResponse().getStatus())) {
                //  결제 상태 변경
                payment.setPaymentStatus(Payment.PaymentStatus.REFUNDED);
                paymentRepository.save(payment);
                log.info(" Payment {} - 환불 성공", paymentId);

                //사용자 총 지출액 업데이트
                User user = payment.getUser();
                BigDecimal current = user.getTotalSpent();
                BigDecimal refundAmount = payment.getAmount();
                if (current.compareTo(refundAmount) < 0) {
                    log.warn(" 유저 ID {}의 totalSpent가 음수로 내려갈 수 있어 차단됨", user.getId());
                    user.setTotalSpent(BigDecimal.ZERO); // 하한선 0
                } else {
                    user.setTotalSpent(current.subtract(refundAmount));
                }

                userRepository.save(user);
                log.info(" Updated totalSpent for User ID {}: {}", user.getId(), user.getTotalSpent());
                return true;
            } else {
                log.warn("Payment {} - 환불 실패. PortOne 응답: {}", paymentId, response);
                return false;
            }
        } catch (IamportResponseException | IOException e) {
            log.error(" PortOne 서버와 통신 실패: {}", e.getMessage(), e);
            return false;
        }
    }

    @Override
    public String testRefund(String imp_uid) throws IamportResponseException, IOException {
        CancelData cancelData = new CancelData(imp_uid,true,BigDecimal.valueOf(100));
        IamportResponse<com.siot.IamportRestClient.response.Payment> result = iamportClient.cancelPaymentByImpUid(cancelData);
        return "환불 테스트"+result.getMessage();

    }


    // 여러 개의 주문 상태 및 아이템 수정
//    @Override
//    public List<OrderDTO> modifyOrder(List<OrderDTO> orderDTOList, Integer userId) {
//        List<OrderDTO> updatedOrderDTOs = new ArrayList<>();
//        orderDTOList.forEach(orderDTO -> {
//            // 주문 조회: 사용자의 이메일과 거주지 ID로 주문을 찾음
//            List<Order> orders = orderRepository.findByUserId(userId);
//            orders.forEach(orderEntity -> {
//                orderEntity.updateOrder(orderDTO.getOrderStatus(), orderDTO.getItems(), orderDTO.getTotalPrice(),
//                        orderDTO.getEmail());
//            });
//            orderRepository.saveAll(orders);
//            orders.forEach(order -> updatedOrderDTOs.add(modelMapper.map(order, OrderDTO.class)));
//        });
//        return updatedOrderDTOs;
//    }
}