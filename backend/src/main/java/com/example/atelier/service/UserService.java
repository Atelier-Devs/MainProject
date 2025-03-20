package com.example.atelier.service;

import com.example.atelier.domain.User;
import com.example.atelier.dto.UserDTO;

public interface UserService {
    // UserDTO를 받아서 회원가입 후 생성된 사용자 ID를 반환
    public Integer registerUser(UserDTO userDTO);
}
