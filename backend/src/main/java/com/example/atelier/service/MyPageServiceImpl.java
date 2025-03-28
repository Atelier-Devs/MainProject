package com.example.atelier.service;

import com.example.atelier.domain.Membership;
import com.example.atelier.domain.User;
import com.example.atelier.dto.*;
import com.example.atelier.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MyPageServiceImpl implements MyPageService{
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;
    private final PaymentRepository paymentRepository;
    private final ReviewRepository reviewRepository;
    private final OrderRepository orderRepository;
    private final MembershipRepository membershipRepository;

    @Override
    public MyPageDTO getUserMypageByEmail(String email) {
        System.out.println("서비스 코드 :" +email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("해당 이메일의 사용자가 존재하지 않습니다: " + email));

        BigDecimal totalSpent = user.getTotalSpent();
        String role = user.getRoleNames().name();
        LocalDateTime joinedAt = user.getCreatedAt().toLocalDateTime();

        // reservation
        List<ReservationDTO> reservationDTOS = reservationRepository.findByUserId(user.getId()).stream()
                .map(r -> ReservationDTO.fromEntity(r))
                .toList();
        System.out.println("서비스 코드 reservationDTOS :" +reservationDTOS);

        // membership
        Membership activeMembership = membershipRepository.findByUserId(user.getId()).stream()
                .filter(m -> m.getStatus() == Membership.Status.ACTIVE)
                .findFirst()
                .orElse(null);
        MembershipDTO membershipDTO = MembershipDTO.fromEntity(activeMembership);

        // order
        List<OrderDTO> orderDTOS = orderRepository.findByUserId(user.getId()).stream()
                .map(o -> OrderDTO.fromEntity(o))
                .toList();
        System.out.println("서비스 코드 orderDTOS :" +orderDTOS);

        // payment
        List<PaymentDTO> paymentDTOS = paymentRepository.findByUserId(user.getId()).stream()
                .map(p -> PaymentDTO.fromEntity(p))
                .toList();
        System.out.println("서비스 코드 paymentDTOS :" +paymentDTOS);

        // review
        List<ReviewDTO> reviewDTOS = reviewRepository.findByUserId(user.getId()).stream()
                .map(r ->ReviewDTO.fromEntity(r))
                .toList();
        System.out.println("서비스 코드 reviewDTOS :" +reviewDTOS);

        // 새로운 DTO생성 후 반환
        return new MyPageDTO(
                user.getName(),
                user.getEmail(),
                totalSpent,
                role,
                joinedAt,
                reservationDTOS,
                membershipDTO,
                orderDTOS,
                paymentDTOS,
                reviewDTOS
        );
    }
}