package com.example.atelier.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ResidenceStatDTO {
    private String roomName;
    private long reservationCount;
}
