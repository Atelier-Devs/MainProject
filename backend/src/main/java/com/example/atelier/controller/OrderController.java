package com.example.atelier.controller;

import com.example.atelier.domain.User;
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

    //     주문 생성
    @PostMapping("/register")
    public ResponseEntity<Integer> createOrder(@RequestBody OrderDTO orderDTO) {
        int orderId = orderService.createOrder(orderDTO);
        return ResponseEntity.ok(orderId);
    }                    // 결제 후 자동 생성되므로 생성할 필요없음.


    // 주문 조회(직원,관리자모드)
    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> searchOrder(@PathVariable Integer id) {
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

    // 특정 사용자 주문 조회
    @GetMapping("/user")
    public ResponseEntity<List<OrderDTO>> searchOrdersByEmail(@RequestParam Integer userId) {
        List<OrderDTO> orderList = orderService.searchOnlyOrder(userId);

        if (orderList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
        return ResponseEntity.ok(orderList);
    }

    // 사용자 환불 요청 API
    @PostMapping("/{orderId}/request-refund")
    public ResponseEntity<String> requestRefund(
            @PathVariable Integer orderId,
            @RequestParam Integer userId) {

        orderService.requestRefund(orderId, userId);
        return ResponseEntity.ok("환불 요청이 성공적으로 접수되었습니다.");
    }

    // 여러 개의 주문 상태 및 아이템 수정
//    @PutMapping("/modify/{userId}")
//    public ResponseEntity<List<OrderDTO>> modifyOrders(@RequestBody List<OrderDTO> orderDTOList, @PathVariable Integer userId) {
//        List<OrderDTO> modifiedOrders = orderService.modifyOrder(orderDTOList, userId);
//
//        if (modifiedOrders.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
//        }
//        return ResponseEntity.ok(modifiedOrders);
//    } 결제 내역을 수정할 일이 없음.
}