package com.example.atelier.controller;

import com.example.atelier.domain.Reservation;
import com.example.atelier.dto.ReservationDTO;
import com.example.atelier.dto.ResidenceDTO;
import com.example.atelier.repository.ReservationRepository;
import com.example.atelier.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/atelier/reservation")
@Slf4j
public class ReservationController {

    @Autowired
    private ReservationService reservationService;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private ModelMapper modelMapper;

    // GET
    @GetMapping("/")
    public List<ReservationDTO> get(@RequestParam String email) {
        return reservationService.get(email);
    }

    // PUT
    @PutMapping("/modify/{id}")
    public void modify(@PathVariable Integer id, @RequestBody ReservationDTO reservationDTO) {
        reservationDTO.setId(id);
        reservationService.modify(reservationDTO);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void remove(@PathVariable Integer id, Reservation reservation, String reason) {
        reservationService.remove(id, reservation, reason);
    }




}
