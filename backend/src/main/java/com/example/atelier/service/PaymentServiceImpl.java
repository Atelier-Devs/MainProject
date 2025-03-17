package com.example.atelier.service;

import com.example.atelier.domain.Membership;
import com.example.atelier.domain.Payment;
import com.example.atelier.domain.Reservation;
import com.example.atelier.domain.User;
import com.example.atelier.dto.PaymentDTO;
import com.example.atelier.repository.MembershipRepository;
import com.example.atelier.repository.PaymentRepository;
import com.example.atelier.repository.ReservationRepository;
import com.example.atelier.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;

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
    private final MembershipServiceImpl membershipService;

    public void confirmPayment(Integer paymentId) {
        // 1️⃣ 결제 정보 조회
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalArgumentException("Payment not found"));

        // 2️⃣ 이미 완료된 결제인지 확인
        if (payment.getPaymentStatus() == Payment.PaymentStatus.COMPLETED) {
            log.warn("Payment ID {} is already COMPLETED", paymentId);
            return;
        }

        // 3️⃣ 결제 상태를 COMPLETED로 변경
        payment.setPaymentStatus(Payment.PaymentStatus.COMPLETED);
        paymentRepository.save(payment);
        log.info("✅ Payment ID {} status updated to COMPLETED", paymentId);

        // 4️⃣ 누적 결제 금액(totalSpent) 업데이트
        User user = payment.getUser();
        BigDecimal previousTotal = user.getTotalSpent() != null ? user.getTotalSpent() : BigDecimal.ZERO;
        BigDecimal updatedTotal = previousTotal.add(payment.getAmount());
        user.setTotalSpent(updatedTotal);
        userRepository.save(user);
        log.info("🔄 Updated totalSpent for User ID {}: {}", user.getId(), updatedTotal);

        // 5️⃣ 멤버십 승급 체크
        Membership membership = membershipRepository.findByUserId(user.getId()).orElse(null);
        if (membership != null) {
            upgradeMembershipIfEligible(membership, user);
        }
    }



    private void upgradeMembershipIfEligible(Membership membership, User user) {

        //  현재까지 누적 결제액 계산
        BigDecimal totalSpent = paymentRepository.getTotalSpentByUser(user.getId());
        if (totalSpent == null) {
            totalSpent = BigDecimal.ZERO;
        }

        log.info("🔍 [디버깅] User ID {} - totalSpent from DB: {}", user.getId(), totalSpent);
        //  현재 등급 확인 후 승급 조건 적용
        if (membership.getCategory() == Membership.Category.GOLD && totalSpent.compareTo(new BigDecimal("1000000")) >= 0) {
            membership.setCategory(Membership.Category.DIAMOND);
            membership.setValidUntil(LocalDateTime.now().plusMonths(12)); // 승급 후 1년 유효기간
            log.info("User ID {} upgraded to DIAMOND", user.getId());

        } else if (membership.getCategory() == Membership.Category.DIAMOND && totalSpent.compareTo(new BigDecimal("3000000")) >= 0) {
            membership.setCategory(Membership.Category.TRINITY);
            membership.setValidUntil(LocalDateTime.now().plusMonths(24)); // 승급 후 2년 유효기간
            log.info("User ID {} upgraded to TRINITY", user.getId());
        } else {
            return; // 승급 조건 미충족 시 리턴
        }

        //  변경된 멤버십 저장
        membershipRepository.save(membership);
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
        Membership membership = membershipRepository.findByUserId(userId)
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
                // ✅ 멤버십 등급별 할인율 적용
                discountRate = membershipService.getDiscountByMembershipCategory(membership.getCategory());
                //할인율을 결제 금액에 반영하는 과정
                BigDecimal discountAmount = finalAmount.multiply(discountRate);
                finalAmount = finalAmount.subtract(discountAmount);

                // 멤버십 카테고리 저장
                membershipCategory = membership.getCategory();
            }
        }
        // **결제 정보 생성**
        Payment payment = new Payment(
                null, user, reservation, membership, // ✅ 멤버십 정보 포함
                null, // 주문 정보 없음 (필요하면 추가)
                finalAmount, Payment.PaymentStatus.COMPLETED, //일단 completed로 고정해놓음. 추후에 상태변경하는 거 해야됨.
                paymentDTO.getPaymentMethod(), new Timestamp(System.currentTimeMillis())
        );
        // **결제 정보 저장**
        payment = paymentRepository.save(payment);
        log.info("Payment saved: ID = {}, Amount = {}", payment.getId(), finalAmount);

        // **자동 승급 로직 실행**
        if (membership != null && membership.getStatus() == Membership.Status.ACTIVE) {
            upgradeMembershipIfEligible(membership, user);
        }

        //  **저장된 결제 ID 반환**
        return payment.getId();
    }
}