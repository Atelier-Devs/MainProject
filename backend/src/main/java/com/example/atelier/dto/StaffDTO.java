package com.example.atelier.dto;

import com.example.atelier.domain.Staff;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StaffDTO {
    private Integer id;                  // 직원 ID
    private Integer user_id;              // 사용자 ID
    private String department;            // 부서 (문자열로 표현)
    private String position;              // 직책
    private Date hire_date;                // 고용 날짜
}
