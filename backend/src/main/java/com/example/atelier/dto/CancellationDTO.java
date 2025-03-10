package com.example.atelier.dto;

import com.example.atelier.domain.Reservation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CancellationDTO {
    private Integer id;               // 취소 로그 ID
    private Integer reservation_id;     // 예약 ID
    private String reason;             // 취소 사유
    private Timestamp cancelled_at;    // 취소된 시간
}
