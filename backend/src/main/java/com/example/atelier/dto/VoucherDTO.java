package com.example.atelier.dto;

import com.example.atelier.domain.Voucher;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VoucherDTO {
    private Integer id;
    private Voucher.Category category;
    private String title;
    private BigDecimal discount;
    private Date validUntil;
    private Voucher.Status status;
}
