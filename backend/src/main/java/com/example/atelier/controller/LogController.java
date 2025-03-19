//package com.example.atelier.controller;
//
//import com.example.atelier.domain.Log;
//import com.example.atelier.dto.LogDTO;
//import com.example.atelier.service.LogService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:3000")
//@RequestMapping("/api/atelier/log")
//@Slf4j
//public class LogController {
//
//    @Autowired
//    private LogService logService;
//
//    // 특정 사용자의 활동 로그 조회
//    @GetMapping("/user/{userId}")
//    public List<LogDTO> getLogsByUser(@PathVariable Integer userId) {
//        return logService.findLogsByUserId(userId);
//    }
//
//    // 모든 로그 조회 (관리자용)
//    @GetMapping("/all")
//    public List<LogDTO> getAllLogs() {
//        return logService.findAllLogs();
//    }
//}
