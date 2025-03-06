package com.example.atelier.dto;

import com.example.atelier.domain.Reservation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
    private Integer id;
    private Integer userId;
    private Integer residenceId;
    private LocalDateTime reservationDate;
    private String status;

    // Entity → DTO 변환 생성자
    public ReservationDTO(Reservation reservation) {
        this.id = reservation.getId();
        this.userId = reservation.getUser().getId();
        this.residenceId = reservation.getResidence().getId();
        this.reservationDate = reservation.getReservationDate();
        this.status = reservation.getStatus().name();
    }
}
