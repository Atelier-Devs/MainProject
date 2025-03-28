package com.example.atelier.controller;

import com.example.atelier.dto.RoomServiceDTO;
import com.example.atelier.service.RoomServiceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/atelier/roomservice")
@Slf4j
public class RoomServiceController {
    private final RoomServiceService roomServiceService;

    // 모든 룸서비스 조회(프론트에서 출력)
    @GetMapping("/list")
    public ResponseEntity<List<RoomServiceDTO>> getAllRoomServices() {
        try {
            List<RoomServiceDTO> roomServices = roomServiceService.getAllRoomServices();
            return ResponseEntity.ok(roomServices);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    // 특정 사용자의 룸서비스 조회(관리자모드)
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RoomServiceDTO>> getRoomServicesByUser(@PathVariable Integer userId) {
        List<RoomServiceDTO> roomServices = roomServiceService.getRoomServiceById(userId);
        return ResponseEntity.ok(roomServices);
    }

    // 룸서비스 수정(관리자모드)
    @PutMapping("/{id}")
    public ResponseEntity<RoomServiceDTO> updateRoomService(@PathVariable Integer id,
                                                            @RequestBody RoomServiceDTO roomServiceDTO) {
        roomServiceDTO.setId(id);
        RoomServiceDTO updatedRoomService = roomServiceService.updateRoomService(id, roomServiceDTO);
        if (updatedRoomService == null) { // null 체크
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(updatedRoomService); // 수정된 DTO 반환
    }

    // 룸서비스 삭제(관리자모드)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoomService(@PathVariable Integer id) {
        roomServiceService.deleteRoomService(id);
        return ResponseEntity.noContent().build();
    }

    // GET(이미지 조회)
    @GetMapping("/with-images")
    public ResponseEntity<List<RoomServiceDTO>> getAllRoomServicesWithImages() {
        return ResponseEntity.ok(roomServiceService.getAllRoomServicesWithImages());
    }

}
