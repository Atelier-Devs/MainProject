package com.example.atelier.domain;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@Entity
@Table(name = "reservations")
@ToString
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "residence_id")
    private Residence residence;

    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL)
    private List<Item> items = new ArrayList<>();

    @Column(name = "reservation_date")
    private LocalDateTime reservationDate;

    @Column(name = "check_out_date")
    private LocalDateTime checkOutDate;

    @Column(name = "guest_count")
    private Integer guestCount;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "created_at")
    private Timestamp createdAt;

    public enum Status {
        PENDING, CONFIRMED, CANCELLED
    }

    public void changeStatus(Status status) {
        this.status = status;
    }
}

