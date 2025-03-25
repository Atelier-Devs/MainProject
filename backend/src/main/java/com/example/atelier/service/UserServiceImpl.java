package com.example.atelier.service;

import com.example.atelier.domain.User;
import com.example.atelier.dto.UserDTO;
import com.example.atelier.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // BCryptPasswordEncoder

    public Integer registerUser(UserDTO userDTO) {
        System.out.println("여기는 service 등록이야 :" +userDTO);
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        // User 엔티티 생성 (필요에 따라 나머지 필드도 설정)
        User user = User.builder()
                .name(userDTO.getName())
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .phone(userDTO.getPhone())
                .roleNames(userDTO.getRoleNames())
                .totalSpent(BigDecimal.ONE)
                .createdAt(Timestamp.valueOf(LocalDateTime.now()))
                .build();
        log.info("user:" +user);
        // DB에 저장
        User savedUser = userRepository.save(user);
        userRepository.flush();
        // 생성된 사용자 ID 반환
        return savedUser.getId();
    }
}
