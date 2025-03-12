package com.example.atelier.domain;
import jakarta.persistence.*;
import lombok.*;
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
@Table(name = "residences")
@ToString
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
        ROOM, FACILITY, DINING
    }

    public enum Status {
        AVAILABLE, UNAVAILABLE
    }

}

