package com.example.atelier.domain;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "residence_id")
    private Residence residence;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL) // Order를 삭제하면 그에 속한 Item들도 함께 삭제
    private List<Item> items; // 주문에 포함된 아이템 리스트

    private BigDecimal totalPrice;
    private String email;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @Column(name = "created_at")
    private Timestamp createdAt;

    public enum OrderStatus {
        PENDING, COMPLETED, CANCELLED
    }

    public void updateOrder(OrderStatus orderStatus, List<Item> items, BigDecimal totalPrice, String email) {
        if (orderStatus != null) {
            this.changeOrderStatus(orderStatus); // 주문 상태 변경
        }
        if (items != null) {
            this.changeItem(items); // 아이템 목록 변경
        }
        if (residence != null) {
            this.changeResidence(residence); // 거주지 변경
        }
        if (totalPrice != null) {
            this.totalPrice = totalPrice; // 총 가격 변경
        }
        if (email != null) {
            this.email = email; // 이메일 변경
        }
    }

    private void changeResidence(Residence residence) {
        this.residence = residence;
    }

    private void changeItem(List<Item> items) {
        this.items = items;
    }

    private void changeOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }


    // 주문의 createdAt 변경
//    public void changeCreatedAt(Timestamp createdAt){
//        this.createdAt=createdAt;
//    } 생각해보니 주문이 발생한 날을 변경할 필요는 없을 것 같다.

}


