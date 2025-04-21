package com.example.atelier.service;

import com.example.atelier.domain.User;
import com.example.atelier.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;


    @Override
    public String findByNameAndPhone(String name, String phone) {
        log.info("이름: {}, 전화번호: {}", name, phone);

        return userRepository.findByNameAndPhone(name, phone)
                .map(User::getEmail)
                .orElseThrow(()-> new UsernameNotFoundException("해당 이름의 사용자를 찾을 수 없습니다."));
    }

    @Override
    public void sendTempPassword(String email) {
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("해당 이메일이 존재하지 않습니다."));
            String tempPassword = UUID.randomUUID().toString().substring(0, 8);
            user.setPassword(passwordEncoder.encode(tempPassword));
            userRepository.save(user);
            emailService.sendPasswordResetEmail(email, tempPassword);
        } catch (Exception e) {
            log.error("sendTempPassword 에러:", e);
            throw e;
        }
    }

    @Override
    public void resetPasswordWithTemp(String email, String tempPassword, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(tempPassword, user.getPassword())) {
            throw new IllegalArgumentException("임시 비밀번호가 일치하지 않습니다.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public void changePassword(String email, String currentPw, String newPw) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(currentPw, user.getPassword())){
                throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
        }

        user.setPassword(passwordEncoder.encode(newPw));
        userRepository.save(user);
    }
}
