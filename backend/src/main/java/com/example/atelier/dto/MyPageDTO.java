package com.example.atelier.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
@ToString
public class MyPageDTO {
    // 마이페이지는 "테이블을 새로 만드는 것"이 아니라, "기존 테이블을 잘 묶어주는 API를 만드는 것"
    // 그러므로 Entity는 필요없고 기존 Entity를 조합한 DTO만 필요

    // 마이페이지를 위한 DTO
    private Integer id;
    private String name;
    private String email;
    private BigDecimal totalSpent;
    private String role;
    private LocalDateTime joinedAt;

    private List<ReservationDTO> reservationDTOS;
    private MembershipDTO membershipDTO;
    private List<OrderDTO> orderDTOS;
    private List<PaymentDTO> paymentDTOS;
    private List<ReviewDTO> reviewDTOS;
}
