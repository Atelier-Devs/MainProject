package com.example.atelier.service;

import com.example.atelier.domain.RoomService;
import com.example.atelier.dto.RoomServiceDTO;

import java.util.List;

public interface RoomServiceService {
    // 모든 룸서비스 조회(관리자모드)
    List<RoomServiceDTO> getAllRoomServices();

    // 특정 사용자의 룸서비스 조회(관리자모드)
    List<RoomServiceDTO> getRoomServiceById(Integer userId);

    // 룸서비스 수정(관리자모드)
    RoomServiceDTO updateRoomService(Integer id, RoomServiceDTO roomServiceDTO);

    // 룸서비스 삭제(관리자모드)
    void deleteRoomService(Integer id);
}
