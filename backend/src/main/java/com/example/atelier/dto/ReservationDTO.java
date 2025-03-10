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
    private Integer user_id;                  // 사용자 ID
    private Integer residence_id;              // 숙소 ID
    private LocalDateTime reservation_date;    // 예약 날짜
    private Reservation.Status status;        // 예약 상태 (문자열로 표현)
    private Timestamp created_at;             // 생성된 시간
}
