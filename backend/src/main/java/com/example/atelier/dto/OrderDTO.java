package com.example.atelier.dto;

import com.example.atelier.domain.Order;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Builder
@Data
public class OrderDTO {
    private Integer id;
    private Integer paymentId; // ✅ Payment 참조 (ID만 저장)
    private Integer userId; // ✅ User 참조 (ID만 저장)
    private BigDecimal totalPrice;
    private Order.PaymentStatus paymentStatus;
    private Order.RefundStatus refundStatus;
    private Timestamp createdAt;
}
