package com.example.atelier.dto;

import com.example.atelier.domain.Voucher;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class VoucherDTO {
    private Integer id;                  // 바우처 ID
    private Voucher.Category category;   // 카테고리 (문자열로 표현)
    private String title;                // 바우처 제목
    private BigDecimal discount;         // 할인 금액
    private Date valid_Until;             // 유효 기간
    private Voucher.Status status;        // 상태 (문자열로 표현)
}
