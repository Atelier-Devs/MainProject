package com.example.atelier.service;

import com.example.atelier.domain.Reservation;
import com.example.atelier.domain.Residence;
import com.example.atelier.domain.User;
import com.example.atelier.dto.ReservationDTO;
import com.example.atelier.repository.ReservationRepository;
import com.example.atelier.repository.ResidenceRepository;
import com.example.atelier.repository.UserRepository;
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
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ResidenceRepository residenceRepository;

    // GET
    @Override
    public List<ReservationDTO> get(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("해당 사용자가 존재하지 않습니다."));
        List<Reservation> result = reservationRepository.findByUserId(user); // 엔티티 타입 전부 찾아오기
        System.out.println("result:" +result);
        List<ReservationDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성
        result.forEach(i -> {
            ReservationDTO data = modelMapper.map(i, ReservationDTO.class); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });
        return resultDtoList;
    }

    // 모든 예약 조회(관리자모드)
    @Override
    public List<ReservationDTO> getAllReservations() {
        List<Reservation> result = reservationRepository.findAll(); // 모든 멤버십 조회
        List<ReservationDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성

        result.forEach(i -> { // Optional이므로 멤버십이 존재할 경우에만(ifPresent) DTO로 변환
            ReservationDTO data = modelMapper.map(i, ReservationDTO.class); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });
        return resultDtoList; // 결과 DTO 리스트 반환
    }

    // PUT
    @Override
    public void modify(ReservationDTO reservationDTO) {
        // 예약 조회
        Optional<Reservation> result = reservationRepository.findById(reservationDTO.getId());
        Reservation reservation = result.orElseThrow(() -> new RuntimeException("Reservation not found"));

        // 예약 변경
        reservation.changeStatus(reservationDTO.getStatus());
        reservationRepository.save(reservation);
    }

    // DELETE
    @Override
    public void remove(Integer id) {
//        // 취소 로그 기록
//        reservationRepository.logCancellation(reservation.getId(), reason);
//
//        // NULL 설정
//        reservationRepository.nullifyCancellationLogsByReservationId(reservation.getId());
//
//        // 예약 상태를 '취소'로 변경
//        reservationRepository.cancelReservation(reservation.getId());

        // 삭제
        reservationRepository.deleteById(id);

//        // 결제 정보 업데이트
//        reservationRepository.refundPayment(reservation.getId());
    }

    // POST
    @Override
    public Integer register(ReservationDTO reservationDTO) {
        log.info("Registering new reservation: {}", reservationDTO);

        // 사용자 & 숙소 조회
        User user = userRepository.findById(reservationDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Residence residence = residenceRepository.findById(reservationDTO.getResidenceId())
                .orElseThrow(() -> new IllegalArgumentException("Residence not found"));

        // DTO → Entity 변환
//            Reservation reservation = toEntity(reservationDTO, user, residence);
        Reservation reservation = modelMapper.map(reservationDTO, Reservation.class);
        System.out.println("reservation: " +reservation);
        // DB 저장
        return reservationRepository.save(reservation).getId();
    }


//    // 특정 예약 삭제 (수동 삭제)
//    @Override
//    public void deleteReservation(Integer reservationId) {
//        Reservation reservation = reservationRepository.findById(reservationId)
//                .orElseThrow(() -> new IllegalArgumentException("Reservation not found"));
//
//        reservationRepository.delete(reservation);
//        log.info("Deleted reservation with ID: {}", reservationId);
//    }
//
//    // 30일 지난 예약 자동 삭제 (매일 새벽 3시 실행)
//    @Scheduled(cron = "0 0 3 * * ?") // 매일 새벽 3시에 실행
//    public void deleteOldReservations() {
//        LocalDateTime thresholdDate = LocalDateTime.now().minusDays(30);
//        List<Reservation> oldReservations = reservationRepository.findByCreatedAtBefore(thresholdDate);
//
//        if (!oldReservations.isEmpty()) {
//            reservationRepository.deleteAll(oldReservations);
//            log.info("Deleted {} old reservations", oldReservations.size());
//        } else {
//            log.info("No old reservations found for deletion.");
//        }
//    }
}
