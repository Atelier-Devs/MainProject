package com.example.atelier.domain;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.sql.Timestamp;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@Entity
@Table(name = "logs")
public class Log {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String action;

    @Column(name = "created_at")
    private Timestamp createdAt;
}
