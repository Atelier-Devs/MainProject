package com.example.atelier.service;

import com.example.atelier.domain.RoomService;
import com.example.atelier.domain.User;
import com.example.atelier.dto.RoomServiceDTO;
import com.example.atelier.repository.RoomServiceRepository;
import com.example.atelier.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class RoomServiceImpl implements RoomServiceService {
    private final ModelMapper modelMapper;
    private final RoomServiceRepository roomServiceRepository;
    private final UserRepository userRepository;

    // 모든 룸서비스 조회(프론트 출력)
    @Override
    public List<RoomServiceDTO> getAllRoomServices() {
        List<RoomService> result = roomServiceRepository.findAll(); // 엔티티 타입 전부 찾아오기
        List<RoomServiceDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성
        result.forEach(i -> {
            RoomServiceDTO data = roomServiceRepository.toDTO(i); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });
        return resultDtoList;
    }

    // 특정 사용자의 룸서비스 조회(관리자모드)
    @Override
    public List<RoomServiceDTO> getRoomServiceById(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("해당 사용자가 존재하지 않습니다."));
        List<RoomService> result = roomServiceRepository.findByUserId(user.getId()); // 엔티티 타입 전부 찾아오기
        System.out.println("result:" +result);
        List<RoomServiceDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성
        result.forEach(i -> {
            RoomServiceDTO data = modelMapper.map(i, RoomServiceDTO.class); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });
        return resultDtoList;
    }

    // 룸서비스 수정(관리자모드)
    @Override
    public RoomServiceDTO updateRoomService(Integer id, RoomServiceDTO roomServiceDTO) {
        // 카테고리에 해당하는 룸서비스를 찾는다
        RoomService roomService = roomServiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("룸서비스를 찾을 수 없습니다."));

        // DTO로 전달된 값으로 데이터 수정
        roomService.setName(roomServiceDTO.getName());
        roomService.setPrice(roomServiceDTO.getPrice());

        // 수정된 데이터 저장
        roomServiceRepository.save(roomService);
        return modelMapper.map(roomService, RoomServiceDTO.class);
    }

    // 룸서비스 삭제(관리자모드)
    @Override
    public void deleteRoomService(Integer id) {
        RoomService roomService = roomServiceRepository.findById(id).orElseThrow(() -> new RuntimeException("RoomService not found"));
        roomServiceRepository.delete(roomService);
    }

    // 룸서비스 이미지 전체 조회(서버시작 시)
    @Override
    public List<RoomServiceDTO> getAllRoomServicesWithImages() {
        return roomServiceRepository.findAll().stream().map(service -> {
            RoomServiceDTO dto = modelMapper.map(service, RoomServiceDTO.class);
            dto.setImages(
                    service.getProductImages().stream()
                            .map(img -> "/upload/roomservice/" + img.getFileName())
                            .toList()
            );
            return dto;
        }).toList();
    }
}