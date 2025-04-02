package com.example.atelier.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "payment_id")
    private Payment payment; // 이 아이템이 속한 결제

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order; // 이 아이템이 속한 주문

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Restaurant> restaurant;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<RoomService> roomService;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Bakery> bakery;
}