package com.example.atelier.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "payment_id", nullable = false) // ✅ Payment 참조 추가
    private Payment payment;


    @ManyToOne
    @JoinColumn(name = "reservation_id", nullable = false)
    private Reservation reservation;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private BigDecimal totalPrice; // ✅ 결제 금액

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus; // ✅ 결제 상태 관리

    @Enumerated(EnumType.STRING)
    private RefundStatus refundStatus; // ✅ 환불 상태 관리

    @Column(name = "created_at")
    private Timestamp createdAt;

    public enum PaymentStatus {
        PENDING, COMPLETED, FAILED, REFUNDED
    }

    public enum RefundStatus {
        NONE, REFUND_PENDING, REFUNDED
    }

    // ✅ 환불 요청
    public void requestRefund() {
        if (this.refundStatus == RefundStatus.NONE && this.paymentStatus == PaymentStatus.COMPLETED) {
            this.refundStatus = RefundStatus.REFUND_PENDING;
        } else {
            throw new IllegalStateException("환불 요청이 불가능한 상태입니다.");
        }
    }
    // ✅ 환불 완료
    public void completeRefund() {
        if (this.refundStatus == RefundStatus.REFUND_PENDING) {
            this.refundStatus = RefundStatus.REFUNDED;
            this.paymentStatus = PaymentStatus.REFUNDED;
        }
    }
}