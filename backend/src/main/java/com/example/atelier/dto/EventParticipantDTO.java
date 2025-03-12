package com.example.atelier.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class EventParticipantDTO {
    private Integer id;               // 참가자 ID
    private Integer userId;           // 사용자 ID
    private Integer voucherId;        // 쿠폰 ID
    private Timestamp registeredAt;   // 등록된 시간
}
