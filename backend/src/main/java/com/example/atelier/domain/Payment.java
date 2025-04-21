package com.example.atelier.domain;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@Entity
@Builder
@ToString
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "reservation_id", nullable = false)
    private Reservation reservation;

    @ManyToOne
    @JoinColumn(name = "membership_id")
    private Membership membership;

    @OneToOne(mappedBy = "payment") // ✅ Order에서 관계를 관리함 (FK는 Order 테이블에 생성됨)
    private Order order;

    private BigDecimal amount; // ✅ 결제 금액 필드 올바른 위치로 이동

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Column(name = "created_at")
    private Timestamp createdAt;

    public enum PaymentStatus {
        PENDING, COMPLETED, FAILED, REFUNDED
    }

    public enum PaymentMethod {
        CREDIT_CARD, PAYPAL, BANK_TRANSFER
    }

    // Payment 엔티티에 추가할 필드
    @Column(name = "imp_uid")
    private String impUid;

    public void changePaymentMethod(PaymentMethod newMethod) {
        if (this.paymentStatus != PaymentStatus.PENDING) {
            throw new IllegalStateException("진행 중인 결제만 결제 방법을 변경할 수 있습니다.");
        }
        this.paymentMethod = newMethod;
    }
}
