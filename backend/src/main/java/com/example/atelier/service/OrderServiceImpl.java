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

    // 주문생성
    @Override
    public int createOrder(OrderDTO orderDTO) {
        log.info("createOrder ------------------");
        Order order = modelMapper.map(orderDTO, Order.class);
        return orderRepository.save(order).getId();
    }

    // 주문조회(직원,관리자모드)
    @Override
    public OrderDTO searchOrder(int id) {
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
    public List<OrderDTO> searchOnlyOrder(String email) {
        log.info("Order service searchOnlyOrder ------------------" + email);
        List<OrderDTO> orderDTO = new ArrayList<>();
        List<Order> order = orderRepository.findByUserEmail(email);
        order.forEach(i -> orderDTO.add(modelMapper.map(i, OrderDTO.class)));
        return orderDTO;
    }
    // 여러 개의 주문 상태 및 아이템 수정
    @Override
    //한사람이 여러개 주문한 걸 한 번에 수정할 수 있도록
    public List<OrderDTO> modifyOrder(List<OrderDTO> orderDTOList) {
        List<OrderDTO> orderDTO = new ArrayList<>();
        orderDTOList.forEach(i -> { //주문 조회
            List<Order> order = orderRepository.findByUserEmailAndResidenceId(i.getEmail(), i.getResidenceId());//장바구니
            order.forEach(orderEntity -> {
                //주문 상태,아이템 변경
                orderEntity.changeOrderStatus(i.getOrderStatus());
                orderEntity.changeItems(i.getItems());
            });
        });
        return orderDTO;
    }


}
