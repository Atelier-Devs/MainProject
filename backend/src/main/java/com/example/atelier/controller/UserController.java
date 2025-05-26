package com.example.atelier.controller;

import com.example.atelier.domain.User;
import com.example.atelier.dto.*;
import com.example.atelier.repository.UserRepository;
import com.example.atelier.service.UserService;
import com.example.atelier.util.JWTUtil;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/atelier")
@Slf4j
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDTO userDTO) {
        try {
            Integer userId = userService.registerUser(userDTO);
            log.info("register controller 100) {userid: {}}", userId);
            return ResponseEntity.ok("User registered successfully. ID: " + userId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("회원가입 중 오류가 발생했습니다.");
        }
    }

    // 로그인
//    @PostMapping("/login")
//    @ResponseBody
//    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO) {
//        log.info("데이터 들어오나요? {}",loginRequestDTO);
//        String email = loginRequestDTO.getEmail();
//        String password = loginRequestDTO.getPassword();
//
//        User user = userService.findByEmail(email)
//                .orElseThrow(() -> new UsernameNotFoundException("해당 이메일이 존재하지 않습니다."));
//
//        if (user.getPassword().equals(password)) { // 실제 운영 시에는 passwordEncoder.matches 사용 권장
//            Map<String, Object> valueMap = new HashMap<>();
//            valueMap.put("userId", user.getId());
//            valueMap.put("email", user.getEmail());
//            valueMap.put("name", user.getName());
//            valueMap.put("phone", user.getPhone());
//            valueMap.put("roleNames", user.getRoleNames().name());
//
//            String token = JWTUtil.generateToken(valueMap, 60); // 60분 유효
//            return ResponseEntity.ok(new LoginResponseDTO(
//                    "성공", token, user.getId(), user.getName(), user.getEmail(), user.getRoleNames().name()));
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(new ErrorResponseDTO("Login failed: Invalid email or password."));
//        }
//    }

    // 로그아웃
    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("로그아웃 완료");
    }

    // 비밀번호 검증 API
    @PostMapping("/member/verify-password")
    public ResponseEntity<?> verifyPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("해당 이메일이 존재하지 않습니다."));

        if (passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.ok().body("비밀번호 일치");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호 불일치");
        }
    }
}
