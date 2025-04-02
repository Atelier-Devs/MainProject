package com.example.atelier.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentSummaryDTO {
    private Integer reservationId;
    private String userName;
    private String userEmail;
    private String reservationDate;        // ← 기존 date
    private String roomSummary;            // ← 기존 roomInfo

    private BigDecimal originalAmount;
    private BigDecimal discountRate;
    private String membershipCategory;
    private BigDecimal finalAmount;

    private Map<String, BigDecimal> itemBreakdown;   // ← 기존 itemSummary
}
