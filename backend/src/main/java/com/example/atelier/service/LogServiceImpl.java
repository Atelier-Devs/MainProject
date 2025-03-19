//package com.example.atelier.service;
//
//import com.example.atelier.domain.Log;
//import com.example.atelier.domain.User;
//import com.example.atelier.dto.LogDTO;
//import com.example.atelier.dto.ReservationDTO;
//import com.example.atelier.repository.LogRepository;
//import com.example.atelier.repository.UserRepository;
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.sql.Timestamp;
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//@Transactional
//@RequiredArgsConstructor
//@Slf4j
//public class LogServiceImpl implements LogService{
//    @Autowired
//    private LogRepository logRepository;
//    @Autowired
//    private UserRepository userRepository;
//    @Autowired
//    private ModelMapper modelMapper;
//
//    // 사용자 활동 로그 저장
//    @Override
//    public void saveLog(User user, String action) {
//        Log log = new Log();
//        log.setUser(user);
//        log.setAction(action);
//        log.setCreatedAt(new Timestamp(System.currentTimeMillis()));
//        logRepository.save(log);
//    }
//
//    // 특정 사용자의 로그 조회
//    @Override
//    public List<LogDTO> findLogsByUserId(Integer userId) {
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("해당 사용자가 존재하지 않습니다."));
//        List<Log> result = logRepository.findByUserId(user);
//        List<LogDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성
//        result.forEach(i -> {
//            LogDTO data = modelMapper.map(i, LogDTO.class); // 엔티티를 DTO타입으로 변환
//            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
//        });
//        return resultDtoList;
//    }
//
//    // 모든 로그 조회 (관리자용)
//    @Override
//    public List<LogDTO> findAllLogs() {
//        List<Log> result = logRepository.findAll();
//        List<LogDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성
//
//        result.forEach(i -> {
//            LogDTO data = modelMapper.map(i, LogDTO.class); // 엔티티를 DTO타입으로 변환
//            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
//        });
//        return resultDtoList; // 결과 DTO 리스트 반환
//    }
//}