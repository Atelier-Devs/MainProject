package com.example.atelier.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name; // 아이템 이름
    private BigDecimal price; // 아이템 가격

    @Enumerated(EnumType.STRING)
    private Category category; // 아이템 카테고리

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // 이 아이템이 속한 사용자

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order; // 이 아이템이 속한 주문

    public enum Category {
        RESTAURANT, ROOM_SERVICE, BAKERY // 카테고리 정의
    }
}
