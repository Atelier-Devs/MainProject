package com.example.atelier.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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
