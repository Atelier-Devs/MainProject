package com.example.atelier.controller;

import com.example.atelier.domain.User;
import com.example.atelier.dto.*;
import com.example.atelier.repository.UserRepository;
import com.example.atelier.service.UserService;
import com.example.atelier.util.JWTUtil;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/atelier")
@Slf4j
public class UserController {


    private final UserRepository userRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;

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
        System.out.println("login controller : " + loginRequestDTO);
        String email = loginRequestDTO.getEmail();
        String password = loginRequestDTO.getPassword();

        // 1) 이메일로 사용자 조회
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("해당 이메일이 없어요"));

        // 2) 비밀번호 비교
        if (user.getPassword().equals(password)) { // ❗보안적으로는 BCrypt 권장

            // JWT 토큰 생성
            Map<String, Object> valueMap = new HashMap<>();
            valueMap.put("userId", user.getId());
            valueMap.put("email", user.getEmail());
            valueMap.put("name", user.getName());
            valueMap.put("phone", user.getPhone());
            valueMap.put("roleNames", user.getRoleNames().name());

            String token = JWTUtil.generateToken(valueMap, 60); // 60분 유효

            // 응답 DTO에 토큰 포함
            return ResponseEntity.ok(new LoginResponseDTO("성공",token));

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponseDTO("Login failed: Invalid email or password."));
        }
    }


    // 로그아웃
    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        System.out.println(
                "controller logout 들어왔어요 " 
        );
        session.invalidate(); // 세션 종료
        return ResponseEntity.ok("로그아웃 완료");
    }
}