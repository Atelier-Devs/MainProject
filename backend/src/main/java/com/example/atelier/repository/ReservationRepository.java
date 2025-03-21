package com.example.atelier.repository;

import com.example.atelier.domain.Reservation;
import com.example.atelier.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation,Integer> {
    List<Reservation> findByUserId(Integer userId);



//    // 취소 로그 기록
//    @Transactional
//    @Modifying
//    @Query(value = "INSERT INTO cancellation_logs (reservation_id, cancelled_at, reason) VALUES (?1, NOW(), ?2)", nativeQuery = true)
//    void logCancellation(Integer reservationId, String reason);

//    // 예약 ID로 취소 로그의 reservation_id를 NULL로 설정
//    @Transactional
//    @Modifying
//    @Query(value = "UPDATE cancellation_logs SET reservation_id = NULL WHERE reservation_id = ?1", nativeQuery = true)
//    void nullifyCancellationLogsByReservationId(Integer reservationId);

    // 예약 상태를 '취소'로 변경
    @Transactional
    @Modifying
    @Query(value = "UPDATE reservations SET status = 'CANCELLED' WHERE id = ?1", nativeQuery = true)
    void cancelReservation(Integer reservationId);

//    // 결제 정보 업데이트
//    @Transactional
//    @Modifying
//    @Query(value = "UPDATE payments SET payment_status = 'REFUNDED' WHERE id = ?1", nativeQuery = true)
//    void refundPayment(Integer reservationId);
}
