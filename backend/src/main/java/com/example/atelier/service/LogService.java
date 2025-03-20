package com.example.atelier.service;

import com.example.atelier.domain.User;
import com.example.atelier.dto.LogDTO;

import java.util.List;

public interface LogService {
    // 사용자 활동 로그 저장
    void saveLog(User user, String action);

    // 특정 사용자의 로그 조회
    List<LogDTO> findLogsByUserId(Integer userId);

    // 모든 로그 조회 (관리자용)
    List<LogDTO> findAllLogs();
}
