package com.example.atelier.domain;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@Entity
@Table(name = "memberships")
public class Membership {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private Category category;

    private BigDecimal discount;

    @Column(name = "valid_until")
    private LocalDateTime validUntil;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Category {
        TRINITY, DIAMOND, GOLD
    }

    public enum Status {
        ACTIVE, EXPIRED, USED
    }
}
