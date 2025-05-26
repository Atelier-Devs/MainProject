package com.example.atelier.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class StaffStatusDTO {
    private double refundRate; // 환불률 (%)
    private BigDecimal totalPaymentAmount; // 총 결제 금액
    private List<ResidenceStatDTO> popularRooms; // 인기 객실
    private BigDecimal totalRefundAmount; //총 환불금액
    private List<UserStatDTO> topSpenders; // 지출 랭킹
}
