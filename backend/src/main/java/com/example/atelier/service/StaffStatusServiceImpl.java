package com.example.atelier.service;

import com.example.atelier.domain.Order;
import com.example.atelier.dto.ResidenceStatDTO;
import com.example.atelier.dto.StaffStatusDTO;
import com.example.atelier.dto.UserStatDTO;
import com.example.atelier.repository.OrderRepository;
import com.example.atelier.repository.ResidenceRepository;
import com.example.atelier.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StaffStatusServiceImpl implements StaffStatusService  {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ResidenceRepository residenceRepository;

    public StaffStatusDTO getStaffStatus() {
        //총 결제 금액
        BigDecimal totalPaymentAmount = orderRepository.getTotalPaymentAmount();

        //환불률
        Long totalOrderCount = orderRepository.count();
        Long refundCount = orderRepository.countByRefundStatus(Order.RefundStatus.REFUNDED);
        double refundRate = totalOrderCount == 0 ? 0 : (refundCount * 100.0) / totalOrderCount;

        //인기 객실
        List<ResidenceStatDTO> popularRooms = orderRepository.getPopularRooms();

        //사용자 지출 랭킹
        List<UserStatDTO> topUsers = userRepository.findTopUsersByTotalSpent(PageRequest.of(0, 10));

        return new StaffStatusDTO( refundRate, totalPaymentAmount,popularRooms, topUsers);
    }
}