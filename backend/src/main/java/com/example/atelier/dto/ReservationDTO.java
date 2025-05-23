package com.example.atelier.dto;

import com.example.atelier.domain.Reservation;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReservationDTO {
    private Integer id;                      // 예약 ID
    private Integer userId;                  // 사용자 ID
    private Integer residenceId;              // 숙소 ID
    private String residenceName;             // 숙소 이름
    private LocalDateTime reservationDate;    // 예약 날짜
    private Reservation.Status status;        // 예약 상태 (문자열로 표현)
    private Timestamp createdAt;             // 생성된 시간
    private BigDecimal residencePrice;

    public static ReservationDTO fromEntity(Reservation reservation) {
        if (reservation == null) return null;

        return new ReservationDTO(
                reservation.getId(),
                reservation.getUser() != null ? reservation.getUser().getId() : null,
                reservation.getResidence() != null ? reservation.getResidence().getId() : null,
                reservation.getResidence() != null ? reservation.getResidence().getName() : null,
                reservation.getReservationDate(),
                reservation.getStatus(),
                reservation.getCreatedAt(),
                reservation.getResidence() != null ? reservation.getResidence().getPrice() : null
        );
    }

}
