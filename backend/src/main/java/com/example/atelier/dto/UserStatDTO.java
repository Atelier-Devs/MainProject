package com.example.atelier.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserStatDTO {
    private String userName;
    private BigDecimal totalSpent;

}
