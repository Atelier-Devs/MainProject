package com.example.atelier.dto;

import com.example.atelier.domain.Order;
import com.example.atelier.domain.Payment;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@ToString
public class PaymentDTO {
    private Integer id; // 결제 ID
    private Integer userId; // 사용자 ID
    private Integer reservationId; // 예약 ID
    private Integer membershipId; // 멤버십 ID
    private Integer orderId; // 주문 ID
    private BigDecimal amount; // 결제 금액
    private String impUid; // 프론트에서 impUid 받아야 환불 가능
    private Payment.PaymentStatus paymentStatus; // 결제 상태
    private Payment.PaymentMethod paymentMethod; // 결제 방법
    private Timestamp createdAt; // 생성된 시간
    private String residenceName; // 객실 이름
    private Integer residenceId; // 객실 ID
    private Order.RefundStatus refundStatus; // ✅ 환불 상태 추가됨

    public static PaymentDTO fromEntity(Payment payment) {
        if (payment == null) return null;

        return new PaymentDTO(
                payment.getId(),
                payment.getUser() != null ? payment.getUser().getId() : null,
                payment.getReservation() != null ? payment.getReservation().getId() : null,
                payment.getMembership() != null ? payment.getMembership().getId() : null,
                payment.getOrder() != null ? payment.getOrder().getId() : null,
                payment.getAmount(),
                payment.getImpUid(),
                payment.getPaymentStatus(),
                payment.getPaymentMethod(),
                payment.getCreatedAt(),
                payment.getReservation() != null && payment.getReservation().getResidence() != null
                        ? payment.getReservation().getResidence().getName() : null,
                payment.getReservation() != null && payment.getReservation().getResidence() != null
                        ? payment.getReservation().getResidence().getId() : null,
                payment.getOrder() != null ? payment.getOrder().getRefundStatus() : null // ✅ 환불 상태 포함
        );
    }
}
