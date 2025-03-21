package com.example.atelier.service;

import com.example.atelier.domain.Membership;
import com.example.atelier.domain.User;
import com.example.atelier.dto.MembershipDTO;
import com.example.atelier.repository.MembershipRepository;
import com.example.atelier.repository.PaymentRepository;
import com.example.atelier.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MembershipServiceImpl implements MembershipService{

    private final MembershipRepository membershipRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;


        void upgradeMembershipIfEligible(Membership membership,User user) {

        //  현재까지 누적 결제액 계산
        BigDecimal totalSpent = paymentRepository.getTotalSpentByUser(user.getId());
        if (totalSpent == null) {
            totalSpent = BigDecimal.ZERO;
        }

        log.info("🔍 [디버깅] User ID {} - totalSpent from DB: {}", user.getId(), totalSpent);
        //  현재 등급 확인 후 승급 조건 적용
        if (membership.getCategory() == Membership.Category.GOLD && totalSpent.compareTo(new BigDecimal("1000000")) >= 0) {
            membership.setCategory(Membership.Category.DIAMOND);
            membership.setValidUntil(LocalDateTime.now().plusMonths(12)); // 승급 후 1년 유효기간
            log.info("User ID {} upgraded to DIAMOND", user.getId());

        } else if (membership.getCategory() == Membership.Category.DIAMOND && totalSpent.compareTo(new BigDecimal("3000000")) >= 0) {
            membership.setCategory(Membership.Category.TRINITY);
            membership.setValidUntil(LocalDateTime.now().plusMonths(24)); // 승급 후 2년 유효기간
            log.info("User ID {} upgraded to TRINITY", user.getId());
        } else {
            return; // 승급 조건 미충족 시 리턴
        }

        //  변경된 멤버십 저장
        membershipRepository.save(membership);
    }

    public BigDecimal getDiscountByMembershipCategory(Membership.Category category) {
        switch (category) {
            case TRINITY:
                return new BigDecimal("0.30"); // 30% 할인
            case DIAMOND:
                return new BigDecimal("0.20"); // 20% 할인
            case GOLD:
                return new BigDecimal("0.10"); // 10% 할인
            default:
                return BigDecimal.ZERO; // 기본값 (할인 없음)
        }
    }


    // POST
    @Override
    public Membership register(MembershipDTO membershipDTO){
        Membership membership = modelMapper.map(membershipDTO, Membership.class);

        // Category에 따른 할인율 설정
        BigDecimal discount = calculateDiscount(membership.getCategory());
        // membership에 할인율을 적용
        membership.setDiscount(discount);

        // DB에 저장
        return membershipRepository.save(membership);
    }

    // 카테고리별 할인율 계산 메서드
    private BigDecimal calculateDiscount(Membership.Category category) {
        switch (category) {
            case TRINITY:
                return new BigDecimal("0.30"); // 30% 할인
            case DIAMOND:
                return new BigDecimal("0.20"); // 20% 할인
            case GOLD:
                return new BigDecimal("0.10"); // 10% 할인
            default:
                return BigDecimal.ZERO; // 기본값 (할인 없음)
        }
    }

    // 특정 ID 조회
    @Override
    public List<MembershipDTO> get(Integer userId) {

        // 사용자 존재 여부 체크
        User userNone = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("해당 사용자가 존재하지 않습니다." ));
        //멤버십 조회
        Optional<Membership> result = membershipRepository.findByUserId(userId); // 특정 ID의 엔티티 조회

        //여기에 예외처리 result의 엔티티가 없으면  return new ArrayList<>();이걸 예외 대신 넣어도됨. -> 빈 배열 출력
        if (result.isEmpty()) {
            throw new RuntimeException("해당 사용자의 멤버십이 존재하지 않습니다.");
        }

        List<MembershipDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성

        result.ifPresent(i -> {
            MembershipDTO data = modelMapper.map(i, MembershipDTO.class); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });

        return resultDtoList; // 결과 DTO 리스트 반환
    }

    // 모든 멤버십 조회(관리자모드)
    @Override
    public List<MembershipDTO> getAllMemberships() {
        List<Membership> result = membershipRepository.findAll(); // 모든 멤버십 조회
        List<MembershipDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성

        result.forEach(i -> {
            MembershipDTO data = modelMapper.map(i, MembershipDTO.class); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });
        return resultDtoList; // 결과 DTO 리스트 반환
    }

    // PUT
    @Override
    public Membership modify(Integer id, MembershipDTO membershipDTO) {
        return membershipRepository.findById(id)
                .map(Membership -> {
                    Membership.setCategory(membershipDTO.getCategory());
                    Membership.setDiscount(membershipDTO.getDiscount());
                    Membership.setValidUntil(membershipDTO.getValidUntil());
                    Membership.setStatus(membershipDTO.getStatus());
                    return membershipRepository.save(Membership);
                })
                .orElseThrow(() -> new RuntimeException("해당 멤버십이 존재하지 않습니다."));
    }

    // DELETE
    @Override
    public void remove(Integer id) {
        membershipRepository.deleteById(id);
    }

    // 멤버십  사용 처리 (유효성 검사 포함)
    @Override
    public void useMembership(Integer id) {
        // 멤버십 조회
        Membership membership = membershipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 멤버십이 존재하지 않습니다."));

        // 멤버십 상태 체크

        if (membership.getStatus() != Membership.Status.NONE) {
            throw new RuntimeException("이 멤버십은 사용할 수 없습니다.");
        }

        // 만료 기한 체크
        if (membership.getValidUntil().isBefore(LocalDateTime.now())) {
            membership.setStatus(Membership.Status.EXPIRED);
            throw new RuntimeException("이 멤버십은 이미 만료되었습니다.");
        }

        // 멤버십 사용 처리
        membership.setStatus(Membership.Status.ACTIVE);
        membershipRepository.save(membership);
    }
}
