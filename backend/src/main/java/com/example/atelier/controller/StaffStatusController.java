package com.example.atelier.controller;

import com.example.atelier.dto.StaffStatusDTO;
import com.example.atelier.service.StaffStatusServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/atelier/admin")
@Slf4j
public class StaffStatusController {

    private final StaffStatusServiceImpl staffStatusService;

    @GetMapping("/stats")
    @PreAuthorize("hasRole('STAFF')")
    public StaffStatusDTO getStaffStatistics() {
        log.info("!?@ 관리자 통계 데이터 요청됨");
        return staffStatusService.getStaffStatus();
    }

}
