package com.example.atelier.controller;

import com.example.atelier.repository.CancellationLogRepository;
import com.example.atelier.repository.ReservationRepository;
import com.example.atelier.service.CancellationService;
import com.example.atelier.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/atelier/cancellation")
@Slf4j
public class CancellationController {

    @Autowired
    private CancellationService cancellationService;
    @Autowired
    private CancellationLogRepository cancellationLogRepository;
    @Autowired
    private ModelMapper modelMapper;


}
