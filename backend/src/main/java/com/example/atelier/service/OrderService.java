package com.example.atelier.service;

import com.example.atelier.dto.OrderDTO;

import java.util.List;

public interface OrderService {
    //주문 생성
    public int createOrder(OrderDTO orderDTO);

    //주문조회
    public OrderDTO searchOrder(int id);

    //모든 주문조회
    public List<OrderDTO> searchAllOrder(int id);

    //특정 사용자의 주문 조회
    public List<OrderDTO> searchOnlyOrder(String email);

    //주문 상태변경1
    public List<OrderDTO> modifyOrder(List<OrderDTO> orderDTOList);

    //주문 삭제
}
