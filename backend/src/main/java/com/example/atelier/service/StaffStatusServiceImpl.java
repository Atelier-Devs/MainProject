package com.example.atelier.service;

import com.example.atelier.domain.Order;
import com.example.atelier.dto.ResidenceStatDTO;
import com.example.atelier.dto.StaffStatusDTO;
import com.example.atelier.dto.UserStatDTO;
import com.example.atelier.repository.OrderRepository;
import com.example.atelier.repository.PaymentRepository;
import com.example.atelier.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StaffStatusServiceImpl implements StaffStatusService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    @Override
    public StaffStatusDTO getStaffStatus() {
        // 총 결제 금액 (Order 기준 유지)
        BigDecimal totalPaymentAmount = orderRepository.getTotalPaymentAmount();

        //총 환불 금액
        BigDecimal totalRefundAmount = paymentRepository.getTotalRefundAmount();

        //환불률
        Long totalOrderCount = orderRepository.count();
        Long refundCount = orderRepository.countByRefundStatus(Order.RefundStatus.REFUNDED);
        double refundRate = totalOrderCount == 0 ? 0 : (refundCount * 100.0) / totalOrderCount;

        //인기 객실 (Payment 기준으로 변경)
        List<ResidenceStatDTO> popularRooms = paymentRepository.getPopularRooms();

        //사용자 지출 랭킹
        List<UserStatDTO> topUsers = userRepository.findTopUsersByTotalSpent(PageRequest.of(0, 10));

        return new StaffStatusDTO(refundRate, totalPaymentAmount,popularRooms, totalRefundAmount,topUsers);
    }
}
