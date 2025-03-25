package com.example.atelier.dto;

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
    private Payment.PaymentStatus paymentStatus; // 결제 상태
    private Payment.PaymentMethod paymentMethod; // 결제 방법
    private Timestamp createdAt; // 생성된 시간

    public static PaymentDTO fromEntity(Payment payment) {
        if (payment == null) return null;

        return new PaymentDTO(
                payment.getId(),
                payment.getUser() != null ? payment.getUser().getId() : null,
                payment.getReservation() != null ? payment.getReservation().getId() : null,
                payment.getMembership() != null ? payment.getMembership().getId() : null,
                payment.getOrder() != null ? payment.getOrder().getId() : null,
                payment.getAmount(),
                payment.getPaymentStatus(),
                payment.getPaymentMethod(),
                payment.getCreatedAt()
        );
    }


}
