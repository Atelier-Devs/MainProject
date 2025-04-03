package com.example.atelier.service;

import com.example.atelier.domain.*;
import com.example.atelier.dto.ReservationDTO;
import com.example.atelier.dto.ReservationRegisterDTO;
import com.example.atelier.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ReservationServiceImpl implements ReservationService{

    private final ModelMapper modelMapper;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final ResidenceRepository residenceRepository;
    private final BakeryRepository bakeryRepository;
    private final RoomServiceRepository roomServiceRepository;
    private final RestaurantRepository restaurantRepository;
    private final ItemRepository itemRepository;

    // GET
    @Override
    public List<ReservationDTO> get(Integer userId) {
        System.out.println("1) reservation service userid:" + userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("해당 사용자가 존재하지 않습니다."));
        System.out.println("2) user " + user);
        // user 객체 대신 user의 id를 전달
        List<Reservation> result = reservationRepository.findByUserId(user.getId());
        System.out.println("3) result:" + result);
        List<ReservationDTO> resultDtoList = new ArrayList<>();
        result.forEach(i -> {
            ReservationDTO data = modelMapper.map(i, ReservationDTO.class);
            resultDtoList.add(data);
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

    @Override
    @Transactional
    public ReservationDTO register(ReservationRegisterDTO dto) {
        log.info("Registering new reservation: {}", dto);

        // 연관 엔티티 조회
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Residence residence = residenceRepository.findById(dto.getResidenceId())
                .orElseThrow(() -> new IllegalArgumentException("Residence not found"));

        Restaurant restaurant = null;
        if (dto.getRestaurantId() != null) {
            restaurant = restaurantRepository.findById(dto.getRestaurantId())
                    .orElseThrow(() -> new IllegalArgumentException("Restaurant not found"));
        }

        Bakery bakery = null;
        if (dto.getBakeryId() != null) {
            bakery = bakeryRepository.findById(dto.getBakeryId())
                    .orElseThrow(() -> new IllegalArgumentException("Bakery not found"));
        }

        RoomService roomService = null;
        if (dto.getRoomServiceId() != null) {
            roomService = roomServiceRepository.findById(dto.getRoomServiceId())
                    .orElseThrow(() -> new IllegalArgumentException("RoomService not found"));
        }

        // Item 생성 및 서비스 연결
        Item item = new Item();
        item.setUser(user);

        if (restaurant != null) {
            restaurant.setItem(item); // 양방향 연관 설정
            item.setRestaurant(List.of(restaurant));
        }

        if (bakery != null) {
            bakery.setItem(item);
            item.setBakery(List.of(bakery));
        }

        if (roomService != null) {
            roomService.setItem(item);
            item.setRoomService(List.of(roomService));
        }

        itemRepository.save(item); // 반드시 먼저 저장

        // Reservation 생성
        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setResidence(residence);
        reservation.setItem(item); // 핵심 연결
        reservation.setReservationDate(dto.getReservationDate());
        reservation.setCheckOutDate(dto.getCheckOutDate());
        reservation.setGuestCount(dto.getGuestCount());
        reservation.setStatus(Reservation.Status.PENDING);
        reservation.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        Reservation saved = reservationRepository.save(reservation);
        return ReservationDTO.fromEntity(saved);
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
