package com.example.atelier.service;

import com.example.atelier.domain.Reservation;
import com.example.atelier.domain.Residence;
import com.example.atelier.domain.User;
import com.example.atelier.dto.ReservationDTO;
import com.example.atelier.dto.ResidenceDTO;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReservationService  {

    // DTO → Entity 변환 메서드
    default Reservation toEntity(ReservationDTO reservationDTO, User user, Residence residence) {
        return new Reservation(
                reservationDTO.getId(),
                user,
                residence,
                reservationDTO.getReservationDate(),
                Reservation.Status.valueOf(reservationDTO.getStatus()), // Enum 변환
                reservationDTO.getCreatedAt()
        );
    }

    // Entity → DTO 변환 메서드
    default ReservationDTO toDTO(Reservation reservation) {
        return new ReservationDTO(
                reservation.getId(),
                reservation.getUser().getId(),
                reservation.getResidence().getId(),
                reservation.getReservationDate(),
                reservation.getStatus().name(), // Enum을 String으로 변환
                reservation.getCreatedAt()
        );
    }

    Integer register(ReservationDTO reservationDTO);


    // 특정 예약 삭제
    void deleteReservation(Integer reservationId);

    // 오래된 예약 자동 삭제 (스케줄러 사용)
    void deleteOldReservations();
}
