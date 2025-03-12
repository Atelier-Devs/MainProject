package com.example.atelier.dto;

import com.example.atelier.domain.Payment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class PaymentDTO {
    private Integer id;                          // 결제 ID
    private Integer userId;                      // 사용자 ID
    private Integer reservationId;               // 예약 ID
    private Integer voucherId;                   // 쿠폰 ID
    private Integer orderId;                     // 주문 ID
    private BigDecimal amount;                   // 결제 금액
    private Payment.PaymentStatus paymentStatus; // 결제 상태 (문자열로 표현)
    private Payment.PaymentMethod paymentMethod; // 결제 방법 (문자열로 표현)
    private Timestamp createdAt;                 // 생성된 시간
}
