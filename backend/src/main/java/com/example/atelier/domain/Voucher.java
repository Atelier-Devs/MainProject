package com.example.atelier.domain;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@Entity
@Table(name = "vouchers")
public class Voucher {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private Category category;

    private String title;
    private BigDecimal discount;

    @Column(name = "valid_until")
    private Date validUntil;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Category {
        event, promotion, bakery
    }

    public enum Status {
        active, expired, used
    }
}
