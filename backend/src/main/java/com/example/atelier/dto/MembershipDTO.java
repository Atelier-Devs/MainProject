package com.example.atelier.dto;

import com.example.atelier.domain.Membership;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class MembershipDTO {
    private Integer id;                     // 바우처 ID
    private Membership.Category category;   // 카테고리 (문자열로 표현)
    private BigDecimal discount;            // 할인 금액
    private LocalDateTime validUntil;       // 유효 기간
    private Membership.Status status;       // 상태 (문자열로 표현)
}