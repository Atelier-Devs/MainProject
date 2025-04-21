package com.example.atelier.dto;

import com.example.atelier.domain.Order;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class OrderDTO {
    private Integer id;
    private Integer paymentId; // Payment 참조 (ID만 저장)
    private Integer userId; // User 참조 (ID만 저장)
    private BigDecimal totalPrice;
    private Order.PaymentStatus paymentStatus;
    private Order.RefundStatus refundStatus;
    private Timestamp createdAt;
    private Integer reservationId;


    public static OrderDTO fromEntity(Order order) {
        if (order == null) return null;

        return OrderDTO.builder()
                .id(order.getId())
                .paymentId(order.getPayment() != null ? order.getPayment().getId() : null)
                .userId(order.getUser() != null ? order.getUser().getId() : null)
                .reservationId(order.getReservation() != null ? order.getReservation().getId() : null)
                .totalPrice(order.getTotalPrice())
                .paymentStatus(order.getPaymentStatus())
                .refundStatus(order.getRefundStatus())
                .createdAt(order.getCreatedAt())
                .build();
    }

}
