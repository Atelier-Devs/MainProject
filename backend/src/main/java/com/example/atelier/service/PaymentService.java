package com.example.atelier.service;

import com.example.atelier.domain.Payment;
import com.example.atelier.dto.PaymentDTO;
import com.example.atelier.dto.PaymentSummaryDTO;
import com.siot.IamportRestClient.response.IamportResponse;

import java.util.Optional;

public interface PaymentService {

    //결제생성
    public int createPayment(PaymentDTO paymentDTO);

    //결제상태 조회
    Payment.PaymentStatus getPaymentStatus(Integer paymentId);

//    //결제상태변경
//    Optional<Payment.PaymentStatus> updatePaymentStatus(Integer paymentId, Payment.PaymentStatus newStatus);

     PaymentDTO approvePayment(String impUid, PaymentDTO paymentDTO);

//    IamportResponse<com.siot.IamportRestClient.response.Payment> validateIamport(String impUid);

    PaymentSummaryDTO getSummaryForReservation(Integer reservationId);



}
