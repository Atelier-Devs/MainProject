package com.example.atelier.dto;

import com.example.atelier.domain.Residence;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class ResidenceDTO {
    private Integer id;                 // 숙소 ID
    private Residence.Type type;        // 숙소 유형 (문자열로 표현)
    private String name;                // 숙소 이름
    private String description;          // 숙소 설명
    private BigDecimal price;            // 숙소 가격
    private Integer capacity;            // 수용 인원
    private Residence.Status status;     // 숙소 상태 (문자열로 표현)
}
