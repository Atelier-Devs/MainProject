package com.example.atelier.service;

import com.example.atelier.domain.Reservation;
import com.example.atelier.domain.Residence;
import com.example.atelier.dto.ReservationDTO;
import com.example.atelier.dto.ResidenceDTO;
import com.example.atelier.repository.ReservationRepository;
import com.example.atelier.repository.ResidenceRepository;
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
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ReservationServiceImpl implements ReservationService{

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ReservationRepository reservationRepository;

    // 조회
    @Override
    public List<ReservationDTO> get(String email) {
        List<Reservation> result = reservationRepository.findByUserEmail(email); // 엔티티 타입 전부 찾아오기
        List<ReservationDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성
        result.forEach(i -> {
            ReservationDTO data = modelMapper.map(i, ReservationDTO.class); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });
        return resultDtoList;
    }

    // 수정
    @Override
    public void modify(ReservationDTO reservationDTO) {
        // 예약 조회
        Optional<Reservation> result = reservationRepository.findById(reservationDTO.getId());
        Reservation reservation = result.orElseThrow(() -> new RuntimeException("Reservation not found"));

        // 예약 변경
        reservation.changeStatus(reservationDTO.getStatus());
        reservationRepository.save(reservation);
    }

    // 삭제
    @Override
    public void remove(Integer id, Reservation reservation, String reason) {
        // 취소 로그 기록
        reservationRepository.logCancellation(reservation.getId(), reason);

        // NULL 설정
        reservationRepository.nullifyCancellationLogsByReservationId(reservation.getId());

        // 예약 상태를 '취소'로 변경
        reservationRepository.cancelReservation(reservation.getId());

//        // 결제 정보 업데이트
//        reservationRepository.refundPayment(reservation.getId());
        // 삭제
        reservationRepository.deleteById(id);
    }
}
