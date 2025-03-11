package com.example.atelier.dto;

import com.example.atelier.domain.Order;
import com.example.atelier.domain.Residence;
import com.example.atelier.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class OrderDTO {
    private Integer id;                   // 주문 ID
    private Integer userId;               // 사용자 ID
    private Integer residenceId;           // 숙소 ID
    private String items;                  // 주문 항목
    private BigDecimal totalPrice;         // 총 가격
    private Order.OrderStatus orderStatus; // 주문 상태 (문자열로 표현)
    private Timestamp createdAt;          // 생성된 시간
    private String email;                 // 이메일
}
