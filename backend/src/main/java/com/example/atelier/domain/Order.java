package com.example.atelier.domain;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@Entity
@Table(name = "orders")
public class Order {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "residence_id")
    private Residence residence;

    private String items;
    private BigDecimal totalPrice;
    private String email;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @Column(name = "created_at")
    private Timestamp createdAt;

    public enum OrderStatus {
        PENDING, COMPLETED, CANCELLED
    }

    // 주문의 residence 변경
    public void changeResidence(Residence residence){
        this.residence=residence;
    }
    // 주문의 items 변경
    public void changeItems(String items){
        this.items=items;
    }
    // 주문 상태 변경 (이넘 상태 변경 메서드)
    public void changeOrderStatus(OrderStatus orderStatus){
        this.orderStatus = orderStatus;
    }

    // 주문의 createdAt 변경
//    public void changeCreatedAt(Timestamp createdAt){
//        this.createdAt=createdAt;
//    } 생각해보니 주문이 발생한 날을 변경할 필요는 없을 것 같다.

}


