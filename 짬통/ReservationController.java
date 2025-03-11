package com.example.atelier.controller;

import com.example.atelier.dto.ReservationDTO;
import com.example.atelier.dto.UserDTO;
import com.example.atelier.repository.UserRepository;
import com.example.atelier.service.ReservationService;
import com.example.atelier.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.xml.stream.events.DTD;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/atelier/reservation")
@Slf4j

public class ReservationController {

    @Autowired
    private ReservationService service;

    @PostMapping("/add")
    public String addData(@RequestBody ReservationDTO dto){
        System.out.println("contoller data : " + dto);

        return ""+service.register(dto);

    }


}
