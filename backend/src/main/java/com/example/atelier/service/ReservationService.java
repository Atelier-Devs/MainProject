package com.example.atelier.service;

import com.example.atelier.domain.Reservation;
import com.example.atelier.domain.Residence;
import com.example.atelier.domain.User;
import com.example.atelier.dto.ReservationDTO;
import com.example.atelier.dto.ResidenceDTO;

import java.util.List;

public interface ReservationService {
    // 등록
    Integer register(ReservationDTO reservationDTO);

    // 특정 ID 예약 조회
    List<ReservationDTO> get(Integer id);

    // 모든 예약 조회(관리자모드)
    List<ReservationDTO> getAllReservations();

    // 수정
    void modify(ReservationDTO reservationDTO);

    // 삭제
    void remove(Integer id);

//    // DTO → Entity 변환 메서드
//    default Reservation toEntity(ReservationDTO reservationDTO, User user, Residence residence) {
//        return new Reservation(
//                reservationDTO.getId(),
//                user,
//                residence,
//                reservationDTO.getReservationDate(),
//                reservationDTO.getStatus(), // Enum 변환
//                reservationDTO.getCreatedAt()
//        );
//    }
//
//    // Entity → DTO 변환 메서드
//    default ReservationDTO toDTO(Reservation reservation) {
//        return new ReservationDTO(
//                reservation.getId(),
//                reservation.getUser().getId(),
//                reservation.getResidence().getId(),
//                reservation.getReservationDate(),
//                reservation.getStatus(), // Enum을 String으로 변환
//                reservation.getCreatedAt()
//        );
//    }

//    // 특정 예약 삭제
//    void deleteReservation(Integer reservationId);
//
//    // 오래된 예약 자동 삭제 (스케줄러 사용)
//    void deleteOldReservations();
}
