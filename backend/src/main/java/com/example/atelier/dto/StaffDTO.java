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
    private Integer id;
    private Integer userId; // User 엔티티 대신 ID만 포함
    private Staff.Department department;
    private String position;
    private Date hireDate;
}
