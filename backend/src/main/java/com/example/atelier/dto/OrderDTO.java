package com.example.atelier.dto;

import com.example.atelier.domain.Order;
import com.example.atelier.domain.Residence;
import com.example.atelier.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private Integer id;                   // 주문 ID
    private Integer user_id;               // 사용자 ID
    private Integer residence_id;           // 숙소 ID
    private String items;                  // 주문 항목
    private BigDecimal totalPrice;         // 총 가격
    private String orderStatus;            // 주문 상태 (문자열로 표현)
    private Timestamp created_at;          // 생성된 시간
}
