package com.example.atelier.dto;

import java.sql.Timestamp;

public class CancellationLogDTO {
    private Integer id;
    private Integer reservationId; // 예약 ID
    private String reason;
    private Timestamp cancelledAt;


}
