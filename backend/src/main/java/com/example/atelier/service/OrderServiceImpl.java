package com.example.atelier.service;

import com.example.atelier.domain.Order;
import com.example.atelier.dto.OrderDTO;
import com.example.atelier.repository.OrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService{
    private final ModelMapper modelMapper;
    private final OrderRepository orderRepository;

    // 주문 생성
    @Override
    public int createOrder(OrderDTO orderDTO) {
        log.info("createOrder ------------------");
        Order order = modelMapper.map(orderDTO, Order.class);
        return orderRepository.save(order).getId();
    }

    // 주문 조회(직원,관리자모드)
    @Override
    public OrderDTO searchOrder(Integer id) {
        log.info("Order service searchOrder ------------------" + id);
        Optional<Order> result = orderRepository.findById(id);
        Order order = result.orElseThrow();
        return modelMapper.map(order, OrderDTO.class);
    }

    // 모든 주문조회(관리자모드)
    @Override
    public List<OrderDTO> searchAllOrder() {
        log.info("Order service searchAllOrder ------------------");
        List<OrderDTO> list = new ArrayList<>();
        List<Order> orderList = orderRepository.findAll();
        orderList.forEach(i -> list.add(modelMapper.map(i, OrderDTO.class)));
        return list;
    }

    // 특정 사용자의 주문 조회
    @Override
    public List<OrderDTO> searchOnlyOrder(Integer userId) {
        log.info("Order service searchOnlyOrder ------------------" + userId);
        List<Order> result = orderRepository.findByUserId(userId); // 엔티티 타입 전부 찾아오기
        List<OrderDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성
        result.forEach(i -> {
            OrderDTO data = modelMapper.map(i, OrderDTO.class); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });
        return resultDtoList;
    }

    // 여러 개의 주문 상태 및 아이템 수정
    @Override
    public List<OrderDTO> modifyOrder(List<OrderDTO> orderDTOList, Integer userId) {
        List<OrderDTO> updatedOrderDTOs = new ArrayList<>();
        orderDTOList.forEach(orderDTO -> {
            // 주문 조회: 사용자의 이메일과 거주지 ID로 주문을 찾음
            List<Order> orders = orderRepository.findByUserId(userId);
            orders.forEach(orderEntity -> {
                orderEntity.updateOrder(orderDTO.getOrderStatus(), orderDTO.getItems(), orderDTO.getTotalPrice(),
                        orderDTO.getEmail());
            });
            orderRepository.saveAll(orders);
            orders.forEach(order -> updatedOrderDTOs.add(modelMapper.map(order, OrderDTO.class)));
        });
        return updatedOrderDTOs;
    }
}
