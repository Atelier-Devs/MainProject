package com.example.atelier.service;

import com.example.atelier.domain.User;
import com.example.atelier.dto.UserDTO;
import com.example.atelier.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    // 회원가입 메서드
//    @Override
//    public Integer register(UserDTO userDTO) {
//        log.info("user service ------------------");
//        // 1) 이메일 중복 검사
//        String email = userDTO.getEmail();
//        if (userRepository.existsByEmail(email)) {
//            // 이미 존재하면 예외 처리(직접 만든 예외 클래스를 던지거나, IllegalArgumentException 등 사용)
//            throw new IllegalArgumentException("이미 사용 중인 이메일입니다: " + email);
//        }
//
//        // 2) DTO -> Entity 변환
//        User user = modelMapper.map(userDTO, User.class);
//
//        // 3) 비밀번호 암호화 (PasswordEncoder 사용)
//        String rawPassword = userDTO.getPassword();
//        String encodedPassword = passwordEncoder.encode(rawPassword);
//        user.setPassword(encodedPassword);
//
//        // 4) Role, 생성일자 기본값 설정
//         user.setRole(User.Role.CUSTOMER); // 회원가입시 사용자의 기본 역할을 CUSTOMER로 설정
//         user.setCreatedAt(Timestamp.valueOf(LocalDateTime.now())); // 가입날짜 설정
//
//        // 5) DB에 저장
//        User savedUser = userRepository.save(user);
//        return savedUser.getId();
  // }



}
