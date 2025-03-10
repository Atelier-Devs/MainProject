package com.example.atelier.dto;

import com.example.atelier.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class LogDTO {
    private Integer id;               // 로그 ID
    private Integer user_id;           // 사용자 ID
    private String action;            // 수행한 액션
    private Timestamp created_at;      // 생성된 시간
}
