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

import org.springframework.scheduling.annotation.Scheduled;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional

public class ReservationServiceImpl implements ReservationService{

        private final ReservationRepository reservationRepository;
        private final UserRepository userRepository;
        private final ResidenceRepository residenceRepository;
        private final ModelMapper modelMapper;

        //사용
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
            System.out.println("reservatopm: " +reservation);
            // DB 저장
            return reservationRepository.save(reservation).getId();
        }


    // 특정 예약 삭제 (수동 삭제)
    @Override
    public void deleteReservation(Integer reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found"));

        reservationRepository.delete(reservation);
        log.info("Deleted reservation with ID: {}", reservationId);
    }

    // 30일 지난 예약 자동 삭제 (매일 새벽 3시 실행)
    @Scheduled(cron = "0 0 3 * * ?") // 매일 새벽 3시에 실행
    public void deleteOldReservations() {
        LocalDateTime thresholdDate = LocalDateTime.now().minusDays(30);
        List<Reservation> oldReservations = reservationRepository.findByCreatedAtBefore(thresholdDate);

        if (!oldReservations.isEmpty()) {
            reservationRepository.deleteAll(oldReservations);
            log.info("Deleted {} old reservations", oldReservations.size());
        } else {
            log.info("No old reservations found for deletion.");
        }
    }

}
