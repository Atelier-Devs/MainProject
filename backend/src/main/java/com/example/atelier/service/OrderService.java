package com.example.atelier.service;

import com.example.atelier.dto.OrderDTO;

import java.util.List;

public interface OrderService {
    // 주문 생성
    public int createOrder(OrderDTO orderDTO);

    // 주문조회(직원,관리자모드)
    public OrderDTO searchOrder(Integer id);

    // 모든 주문조회(관리자모드)
    public List<OrderDTO> searchAllOrder();

    // 특정 사용자의 주문 조회
    public List<OrderDTO> searchOnlyOrder(Integer userId);

    // 여러 개의 주문 상태 및 아이템 수정
    public void modifyOrder(List<OrderDTO> orderDTOList, Integer userId);
}
