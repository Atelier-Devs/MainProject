package com.example.atelier.dto;

import com.example.atelier.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class UserDTO {
    private Integer id;                  // 사용자 ID
    private String name;                 // 사용자 이름
    private String email;                // 사용자 이메일
    private String password;             // 사용자 비밀번호
    private String phone;                // 사용자 전화번호
    private User.Role role;              // 사용자 역할 (문자열로 표현)
    private Timestamp createdAt;        // 생성된 시간
}
