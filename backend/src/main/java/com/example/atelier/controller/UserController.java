package com.example.atelier.controller;

import com.example.atelier.domain.User;
import com.example.atelier.dto.ErrorResponseDTO;
import com.example.atelier.dto.LoginRequestDTO;
import com.example.atelier.dto.LoginResponseDTO;
import com.example.atelier.dto.UserDTO;
import com.example.atelier.repository.UserRepository;
import com.example.atelier.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/atelier")
@Slf4j
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapper modelMapper;

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        System.out.println("여기는 controller 등록 :" +userDTO);
        try {
            Integer userId = userService.registerUser(userDTO);
            return ResponseEntity.ok("User registered successfully. ID: " + userId);
        } catch (IllegalArgumentException e) {
            // 이미 사용 중인 이메일 등 예외 상황 처리
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            // 기타 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("회원가입 중 오류가 발생했습니다.");
        }
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        System.out.println("login controller : " +loginRequestDTO);
        String email = loginRequestDTO.getEmail();
        String password = loginRequestDTO.getPassword();
        System.out.println("login controller :" +loginRequestDTO);
        // 1) 이메일로 사용자 조회
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("해당 이메일이 없어요"));

        // 2) 사용자 존재 여부 및 비밀번호 비교
        if (user != null && user.getPassword().equals(password)) {
            // 비밀번호가 일치할 경우
            return ResponseEntity.ok(new LoginResponseDTO("Login successful for user: " + email));
        } else {
            // 비밀번호가 일치하지 않을 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponseDTO("Login failed: Invalid email or password."));
        }
    }
}
