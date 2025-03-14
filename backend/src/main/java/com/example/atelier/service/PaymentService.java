package com.example.atelier.service;

import com.example.atelier.dto.PaymentDTO;

public interface PaymentService {

    //결제생성
    public int createPayment(PaymentDTO paymentDTO);
}
