package com.example.atelier.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.sql.Timestamp;
import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@Entity
@Table(name = "staffs")
public class Staff {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private Department department;

    private String position;

    @Column(name = "hire_date")
    private Date hireDate;

    public enum Department {
        reception, housekeeping, restaurant, spa
    }
}

