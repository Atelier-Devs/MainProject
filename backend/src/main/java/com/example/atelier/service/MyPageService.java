package com.example.atelier.service;

import com.example.atelier.domain.Reservation;
import com.example.atelier.domain.Residence;
import com.example.atelier.dto.MyPageDTO;
import com.example.atelier.dto.ReservationDTO;

public interface MyPageService {

    MyPageDTO getUserMypageByEmail(String email);

//    default ReservationDTO toDTO(Reservation reservation) {
//        ReservationDTO dto = new ReservationDTO();
//        dto.setId(reservation.getId());
//        dto.setUserId(reservation.getUser().getId());
//        dto.setResidenceId(reservation.getResidence().getId());
//        dto.setReservationDate(reservation.getReservationDate());
//        dto.setStatus(reservation.getStatus());
//        dto.setCreatedAt(reservation.getCreatedAt());
//        return dto;
//    }

}
