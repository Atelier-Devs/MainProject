package com.example.atelier.controller;

import com.example.atelier.domain.Payment;
import com.example.atelier.dto.PaymentDTO;
import com.example.atelier.dto.PaymentSummaryDTO;
import com.example.atelier.repository.OrderRepository;
import com.example.atelier.repository.PaymentRepository;
import com.example.atelier.repository.ReservationRepository;
import com.example.atelier.service.OrderService;
import com.example.atelier.service.PaymentService;
import com.example.atelier.service.PaymentServiceImpl;
import com.example.atelier.service.ReservationService;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
//import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.IamportResponse;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/atelier/payment")
@Slf4j
public class PaymentController {

    private final PaymentService paymentService; //결제 검증 로직을 Controller -> Service 로 이동.
    private final PaymentServiceImpl paymentServiceImpl;

    // 🔹 결제 단건 조회 API
    @GetMapping("/{paymentId}")
    public ResponseEntity<PaymentDTO> getPayment(@PathVariable Integer paymentId) {
        log.info("📤 결제 단건 조회 요청: ID = {}", paymentId);
        PaymentDTO dto = paymentServiceImpl.getPaymentDTO(paymentId); // 구현체에서 꺼내도 됨
        return ResponseEntity.ok(dto);
    }

    // 결제 승인 (Iamport 연동)
    @PostMapping("/{impUid}/approve")
    public ResponseEntity<PaymentDTO> approvePayment(@PathVariable String impUid, @RequestBody PaymentDTO paymentDTO) {
        PaymentDTO approvedPayment = paymentService.approvePayment(impUid, paymentDTO);
        log.info("✅ 결제 승인 완료: impUid = {}", impUid);
        return ResponseEntity.ok(approvedPayment);
    }



    // 1️⃣ 결제 요청 (결제 생성)
@PostMapping("/create")
public ResponseEntity<Map<String, Object>> createPayment(@RequestBody PaymentDTO paymentDTO) {
        log.info("📥 결제 생성 요청 도착: {}", paymentDTO); // 로그 추가

    int paymentId = paymentService.createPayment(paymentDTO);

    // JSON 형식의 응답을 위한 Map 생성
    Map<String, Object> response = new HashMap<>();
    response.put("message", "결제 성공!");
    response.put("paymentId", paymentId);

    return ResponseEntity.ok(response);
}

// 2️⃣ 결제 상태 조회
@GetMapping("/status/{paymentId}")
public ResponseEntity<String> getPaymentStatus(@PathVariable Integer paymentId) {
    Payment.PaymentStatus status = paymentService.getPaymentStatus(paymentId);
    return ResponseEntity.ok("결제 상태: " + status);
}

// 3) 결제 완료(승인) 처리
@PostMapping("/confirm/{paymentId}")
public ResponseEntity<String> confirmPayment(@PathVariable Integer paymentId) {
    // 여기서 PaymentService의 confirmPayment 호출
    paymentServiceImpl.confirmPayment(paymentId);
    return ResponseEntity.ok("결제가 확정되었습니다. paymentId: " + paymentId);
}

    @GetMapping("/summary/{reservationId}")
    public ResponseEntity<PaymentSummaryDTO> getPaymentSummary(
            @PathVariable Integer reservationId) {
        log.info(" 결제 요약 요청: reservationId = {}", reservationId);
        PaymentSummaryDTO summary = paymentService.getSummaryForReservation(reservationId);
        return ResponseEntity.ok(summary);
    }




}
