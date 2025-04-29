package com.example.atelier.service;

import com.example.atelier.domain.User;
import com.example.atelier.dto.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserService {
    // UserDTO를 받아서 회원가입 후 생성된 사용자 ID를 반환
    public Integer registerUser(UserDTO userDTO);
    boolean existsByEmail(String email); // email 중복 확인
    Optional<User> findByEmail(String email);
    List<User> findAllAdmins();
    void deleteUserById(Integer userId);
}
