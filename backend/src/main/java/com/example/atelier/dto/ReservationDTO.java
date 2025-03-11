package com.example.atelier.dto;

import com.example.atelier.domain.Reservation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
    private Integer id;                      // 예약 ID
    private Integer userId;                  // 사용자 ID
    private Integer residenceId;              // 숙소 ID
    private LocalDateTime reservationDate;    // 예약 날짜
    private Reservation.Status status;        // 예약 상태 (문자열로 표현)
    private Timestamp createdAt;             // 생성된 시간
}
