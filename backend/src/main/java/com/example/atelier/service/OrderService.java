package com.example.atelier.service;

import com.example.atelier.domain.Order;
import com.example.atelier.domain.Payment;
import com.example.atelier.dto.OrderDTO;
import com.siot.IamportRestClient.exception.IamportResponseException;

import java.io.IOException;
import java.util.List;

public interface OrderService {
    // 주문 생성
    public int createOrder(Payment payment);


    // 주문조회(직원,관리자모드)
    public OrderDTO searchOrder(Integer id);

    // 모든 주문조회(관리자모드)
    public List<OrderDTO> searchAllOrder();

    // 특정 사용자의 주문 조회
    public List<OrderDTO> searchOnlyOrder(Integer userId);

    // 여러 개의 주문 상태 및 아이템 수정
//    public List<OrderDTO> modifyOrder(List<OrderDTO> orderDTOList, Integer userId);

    //환불로직
    void approveRefund(Integer orderId, Integer staffId, String reason);

    void requestRefund(Integer orderId, Integer userId);

    public boolean refundPayment(Integer paymentId);

    public String testRefund(String imp_uid) throws IamportResponseException, IOException;



}
