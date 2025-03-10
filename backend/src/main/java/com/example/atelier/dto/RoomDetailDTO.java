package com.example.atelier.dto;

import com.example.atelier.domain.Residence;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class RoomDetailDTO {
    private Integer id;               // 룸 상세 ID
    private Integer residence_id;      // 숙소 ID
    private String feature;           // 룸 특징
}
