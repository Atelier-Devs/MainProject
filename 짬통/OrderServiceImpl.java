package com.example.atelier.service;

import com.example.atelier.domain.Order;
import com.example.atelier.dto.OrderDTO;
import com.example.atelier.repository.OrderRepository;
import jakarta.persistence.Id;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional

public class OrderServiceImpl implements OrderService {

    private final ModelMapper modelMapper;
    private final OrderRepository orderRepository;

    //주문생성
    @Override
    public int createOrder(OrderDTO orderDTO) {
        log.info("createOrder ------------------");
        Order order = modelMapper.map(orderDTO, Order.class);
        return orderRepository.save(order).getId();
    }

    //주문조회
    @Override
    public OrderDTO searchOrder(int id) {
        log.info("Order service searchOrder ------------------" + id);
        Optional<Order> result = orderRepository.findById(id);
        Order order = result.orElseThrow();
        return modelMapper.map(order, OrderDTO.class);
    }

    //모든 주문조회
    @Override
    public List<OrderDTO> searchAllOrder(int id) {
        log.info("Order service searchAllOrder ------------------" + id);
        List<OrderDTO> list = new ArrayList<>();
        List<Order> orderList = orderRepository.findAll();
        orderList.forEach(i -> list.add(modelMapper.map(i, OrderDTO.class)));
        return list;
    }

    //특정 사용자의 주문 조회
    @Override
    public List<OrderDTO> searchOnlyOrder(String email) {
        log.info("Order service searchOnlyOrder ------------------" + email);
        List<OrderDTO> orderDTO = new ArrayList<>();
        List<Order> order = orderRepository.findByUserEmail(email);
        order.forEach(i -> orderDTO.add(modelMapper.map(i, OrderDTO.class)));
        return orderDTO;
    }

    @Override
    public List<OrderDTO> modifyOrder(List<OrderDTO> orderDTOList) {
        List<OrderDTO> orderDTO = new ArrayList<>();
        orderDTOList.forEach(i -> {
            List<Order> order = orderRepository.findByUserEmailAndResidenceId(i.getEmail(), i.getResidenceId());//장바구니
        });

        return orderDTO;
    }
    //주문 상태변경

}
