package com.example.atelier.controller;

import com.example.atelier.dto.OrderDTO;
import com.example.atelier.repository.OrderRepository;
import com.example.atelier.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/atelier/order")
@Slf4j
public class OrderController {

    private OrderService orderService;
    private OrderRepository orderRepository;
    private ModelMapper modelMapper;

    // 주문 생성
    @PostMapping("/register")
    public ResponseEntity<Integer> createOrder(@RequestBody OrderDTO orderDTO) {
        int orderId = orderService.createOrder(orderDTO);
        return ResponseEntity.ok(orderId);
    }

    // 주문조회(직원,관리자모드)
    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> searchOrder(@PathVariable int id) {
        OrderDTO orderDTO = orderService.searchOrder(id);
        return ResponseEntity.ok(orderDTO);
    }

    // 모든 주문조회(관리자모드)
    @GetMapping("/")
    public ResponseEntity<List<OrderDTO>> searchAllOrders() {
        try {
            List<OrderDTO> orderList = orderService.searchAllOrder();
            return ResponseEntity.ok(orderList);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    // 특정 사용자의 주문 조회
    @GetMapping("/user")
    public ResponseEntity<List<OrderDTO>> searchOrdersByEmail(@RequestParam String email) {
        List<OrderDTO> orderList = orderService.searchOnlyOrder(email);

        if (orderList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
        return ResponseEntity.ok(orderList);
    }

    // 여러 개의 주문 상태 및 아이템 수정
    @PutMapping("/modify/{id}")
    public ResponseEntity<List<OrderDTO>> modifyOrders(@RequestBody List<OrderDTO> orderDTOList) {
        List<OrderDTO> modifiedOrders = orderService.modifyOrder(orderDTOList);

        if (modifiedOrders.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
        return ResponseEntity.ok(modifiedOrders);
    }
}
