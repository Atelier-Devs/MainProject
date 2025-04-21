package com.example.atelier.service;

public interface AuthService {
    String findByNameAndPhone(String name, String phone);
    void sendTempPassword(String email);
    // 비로그인 PW 변경
    void resetPasswordWithTemp(String email, String tempPassword, String newPassword);
    // 로그인 마이페이지에서 PW 변경
    void changePassword(String email, String currentPw, String newPw);
}
