package com.example.atelier.dto;

import com.example.atelier.domain.Payment;
import com.example.atelier.domain.Reservation;
import com.example.atelier.domain.User;
import com.example.atelier.domain.Voucher;
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
    private Integer id;                   // 결제 ID
    private Integer user_id;               // 사용자 ID
    private Integer reservation_id;         // 예약 ID
    private Integer voucher_id;             // 쿠폰 ID
    private BigDecimal amount;             // 결제 금액
    private String paymentStatus;          // 결제 상태 (문자열로 표현)
    private String paymentMethod;          // 결제 방법 (문자열로 표현)
    private Timestamp created_at;          // 생성된 시간

    public enum PaymentStatus {
        pending, completed, failed, refunded
    }

    public enum PaymentMethod {
        credit_card, paypal, bank_transfer
    }
}
