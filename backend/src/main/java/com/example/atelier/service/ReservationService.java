package com.example.atelier.service;

import com.example.atelier.domain.Reservation;
import com.example.atelier.dto.ReservationDTO;
import com.example.atelier.dto.ResidenceDTO;

import java.util.List;

public interface ReservationService {
    List<ReservationDTO> get(String email);
    void modify(ReservationDTO reservationDTO);
    void remove(Integer id, Reservation reservation, String reason);
}
