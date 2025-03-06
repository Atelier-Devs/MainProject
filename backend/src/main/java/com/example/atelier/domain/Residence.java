package com.example.atelier.domain;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@Entity
@Table(name = "residences")
public class Residence {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private Type type;

    private String name;
    private String description;
    private BigDecimal price;
    private Integer capacity;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Type {
        room, facility, dining
    }

    public enum Status {
        Available, Unavailable
    }
}

