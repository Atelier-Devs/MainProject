package com.example.atelier.dto;

import com.example.atelier.domain.User;
import lombok.*;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
@ToString
public class UserDTO {
    private Integer id;          // 사용자 ID
    private String name;         // 사용자 이름
    private String email;        // 사용자 이메일
    private String password;     // 사용자 비밀번호
    private String phone;        // 사용자 전화번호
    private User.Role roleNames; // 사용자 역할 (enum)
    private Timestamp createdAt; // 생성된 시간

    public Map<String, Object> getClaims() {
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("userId", this.id); // ✅ 추가!
        dataMap.put("email", email);
        dataMap.put("password", password);
        dataMap.put("phone", phone);
        dataMap.put("name", name); // 사용자 이름도 추가
        // roleNames가 null인 경우 기본 역할 CUSTOMER 할당
        dataMap.put("roleNames", roleNames != null ? roleNames : User.Role.CUSTOMER);
        return dataMap;
    }
}
