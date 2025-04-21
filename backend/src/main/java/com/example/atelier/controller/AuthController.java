package com.example.atelier.controller;

import com.example.atelier.dto.ChangePasswordDTO;
import com.example.atelier.dto.EmailRequestDTO;
import com.example.atelier.dto.FindIdRequestDTO;
import com.example.atelier.dto.ResetPasswordRequestDTO;
import com.example.atelier.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/atelier/auth")
@Slf4j
public class AuthController {

    private final AuthService authService;

    // ID 찾기
    @PostMapping("/find-id")
    public ResponseEntity<String> findId(@RequestBody FindIdRequestDTO dto) {
        log.info("컨트롤러 진입: {}", dto);
        String email = authService.findByNameAndPhone(dto.getName(), dto.getPhone());
        return ResponseEntity.ok(email);
    }

    // PW 찾기
    @PostMapping("/find-password")
    public ResponseEntity<String> findPassword(@RequestBody EmailRequestDTO emailRequestDTO){
        authService.sendTempPassword(emailRequestDTO.getEmail());
        return ResponseEntity.ok("임시 비밀번호가 이메일로 전송되었습니다.");
    }

    // 비로그인 PW 변경
    @PostMapping("/reset-password")
    public ResponseEntity<String> changePasswordWithTemp(@RequestBody ResetPasswordRequestDTO resetPasswordRequestDTO){
        authService.resetPasswordWithTemp(
                resetPasswordRequestDTO.getEmail(),
                resetPasswordRequestDTO.getTempPassword(),
                resetPasswordRequestDTO.getNewPassword());
        return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
    }

    // 로그인한 사용자가 마이페이지에서 PW 변경
    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDTO changePasswordDTO, Principal principal){
        String email = principal.getName();
        authService.changePassword(email, changePasswordDTO.getCurrentPassword(), changePasswordDTO.getNewPassword());
        return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다!");
    }
}
