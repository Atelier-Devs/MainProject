package com.example.atelier.controller;

import com.example.atelier.domain.Reservation;
import com.example.atelier.dto.MembershipDTO;
import com.example.atelier.dto.ReservationDTO;
import com.example.atelier.dto.ReservationRegisterDTO;
import com.example.atelier.dto.ResidenceDTO;
import com.example.atelier.repository.ReservationRepository;
import com.example.atelier.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/atelier/reservations")
@Slf4j
public class ReservationController {


    private final ReservationService reservationService;
    private final ReservationRepository reservationRepository;

    // POST
    @PostMapping("/add")
    public ResponseEntity<ReservationDTO> addData(@RequestBody ReservationRegisterDTO reservationRegisterDTO){
        System.out.println("여기 controller: " + reservationRegisterDTO);
        ReservationDTO saved = reservationService.register(reservationRegisterDTO);
        return ResponseEntity.ok(saved);
    }

    // GET (조회)
    @GetMapping("/{id}")
    public ResponseEntity< List<ReservationDTO>> search(@PathVariable("id") Integer id) {
        System.out.println("여기 controller " + id);
        List<ReservationDTO> data = reservationService.get(id);
        return ResponseEntity.ok(data);
    }

    // GET (상세페이지)
    @GetMapping("/read/{id}")
    public ResponseEntity< List<ReservationDTO>> read(@PathVariable("id") Integer id) {
        System.out.println("여기 controller " + id);
        List<ReservationDTO> data = reservationService.get(id);
        return ResponseEntity.ok(data);
    }

    // GET ALL(관리자모드)
    @GetMapping("/list")
    public ResponseEntity< List<ReservationDTO>> list() {
        System.out.println("reservation controller: ");
        List<ReservationDTO> list = reservationService.getAllReservations();
        System.out.println("reservation list all : " +list);
        return ResponseEntity.ok(list);
    }

    // PUT
    @PutMapping("/modify/{id}")
    public void modify(@PathVariable Integer id, @RequestBody ReservationDTO reservationDTO) {
        reservationDTO.setId(id);
        reservationService.modify(reservationDTO);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public void remove(@PathVariable Integer id) {
        reservationService.remove(id);
    }
}
