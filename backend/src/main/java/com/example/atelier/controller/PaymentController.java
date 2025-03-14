package com.example.atelier.controller;

import com.example.atelier.dto.PaymentDTO;
import com.example.atelier.repository.OrderRepository;
import com.example.atelier.repository.PaymentRepository;
import com.example.atelier.repository.ReservationRepository;
import com.example.atelier.service.OrderService;
import com.example.atelier.service.PaymentService;
import com.example.atelier.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/atelier/payment")
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create")
    public ResponseEntity<String> createPayment(@RequestBody PaymentDTO paymentDTO) {
        log.info("🔄 결제 요청: User ID = {}, Reservation ID = {}, Amount = {}",
                paymentDTO.getUserId(), paymentDTO.getReservationId(), paymentDTO.getAmount());
        int paymentId = paymentService.createPayment(paymentDTO);
        log.info("✅ 결제 완료: Payment ID = {}", paymentId);
        return ResponseEntity.ok("결제 성공! Payment ID: " + paymentId);
    }

}
