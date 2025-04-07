package com.example.atelier.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReservationRegisterDTO {
    private Integer userId;
    private Integer residenceId;
    private LocalDateTime reservationDate;
    private LocalDateTime checkOutDate;
    private Integer guestCount;
    private Integer restaurantId;
    private Integer bakeryId;
    private Integer roomServiceId;
}
