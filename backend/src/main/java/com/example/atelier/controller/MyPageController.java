package com.example.atelier.controller;

import com.example.atelier.dto.*;
import com.example.atelier.service.MyPageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
//@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/atelier/mypage")
@Slf4j
public class MypageController {

    @Autowired
    public  MyPageService myPageService;

    @PostMapping("/profile")
    public ResponseEntity<MyPageDTO> getProfile(@RequestBody UserDTO userDTO) {
        log.info("마이페이지 요청 (PathVariable): {}", userDTO);
        MyPageDTO dto = myPageService.getUserMypageByEmail(userDTO.getEmail());
        System.out.println("dto:"+dto);
        return ResponseEntity.ok(dto);
    }
}