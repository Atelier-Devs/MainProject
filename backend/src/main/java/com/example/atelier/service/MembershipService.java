package com.example.atelier.service;

import com.example.atelier.domain.Membership;
import com.example.atelier.dto.MembershipDTO;
import com.example.atelier.dto.ReservationDTO;
import jakarta.transaction.Transactional;

import java.math.BigDecimal;
import java.util.List;

public interface MembershipService {

//    // POST
//    Membership register(MembershipDTO membershipDTO);

    // POST(신규 멤버십 추가할 경우)
    Membership register(MembershipDTO membershipDTO);

    // 특정 ID 조회
    List<MembershipDTO> get(Integer id);

    // 모든 멤버십 조회(관리자모드)
    List<MembershipDTO> getAllMemberships();

    // PUT
    MembershipDTO modify(Integer id, MembershipDTO membershipDTO);

    // DELETE
    void remove(Integer id);

    // 바우처 사용 처리 (유효성 검사 포함)
    @Transactional
    void useMembership(Integer id);
}
