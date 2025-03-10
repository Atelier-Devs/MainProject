package com.example.atelier.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@Entity
@Table(name = "cancellation_logs")
public class CancellationLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "reservation_id", nullable = true, foreignKey = @ForeignKey(name = "FKjo1jmcid6ty2hqnlqrug3487e", foreignKeyDefinition = "FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE SET NULL"))
    private Reservation reservation;

    private String reason;

    @Column(name = "cancelled_at")
    private Timestamp cancelledAt;
}

