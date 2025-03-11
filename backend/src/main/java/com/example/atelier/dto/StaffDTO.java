package com.example.atelier.dto;

import com.example.atelier.domain.Staff;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class StaffDTO {
    private Integer id;                  // 직원 ID
    private Integer userId;              // 사용자 ID
    private Staff.Department department; // 부서 (문자열로 표현)
    private String position;              // 직책
    private Date hire_date;                // 고용 날짜
}
