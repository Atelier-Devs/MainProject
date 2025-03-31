package com.example.atelier.service;

import com.example.atelier.domain.Residence;
import com.example.atelier.dto.ResidenceDTO;
import com.example.atelier.repository.ResidenceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ResidenceServiceImpl implements ResidenceService{

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ResidenceRepository residenceRepository;

    // 객실 생성(관리자모드)
    @Override
    public Integer register(ResidenceDTO residenceDTO) {
        Residence residence = modelMapper.map(residenceDTO, Residence.class); // scoreDTO 객체를 Score 엔티티 객체로 변환
        Residence savedResidence = residenceRepository.save(residence);
        return savedResidence.getId();
    }

    // 모든 객실 조회(프론트 출력)
    @Override
    public List<ResidenceDTO> get() {
        List<Residence> result = residenceRepository.findAll(); // 엔티티 타입 전부 찾아오기
        List<ResidenceDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성
        result.forEach(i -> {
            ResidenceDTO data = residenceRepository.toDTO(i); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });
        return resultDtoList;
    }

    // 객실 수정(관리자모드)
    @Override
    public void modify(ResidenceDTO residenceDTO) {
        Optional<Residence> result = residenceRepository.findById(residenceDTO.getId()); //수정하려는 데이터 조회
        Residence residence = result.orElseThrow();
        residence.setType(residenceDTO.getType());
        residence.setName(residenceDTO.getName());
        residence.setPrice(residenceDTO.getPrice());
        residence.setCapacity(residenceDTO.getCapacity());
        residence.setStatus(residenceDTO.getStatus());
        residenceRepository.save(residence);
    }

    // 객실 삭제(관리자모드)
    @Override
    public void delete(Integer id) {
        Residence residence = residenceRepository.findById(id).orElseThrow(() -> new RuntimeException("Restaurant not found"));
        residenceRepository.delete(residence);
    }

    // 객실 이미지 전체 조회(서버시작 시)
    @Override
    public List<ResidenceDTO> getAllRooms() {
        return residenceRepository.findAllByType(Residence.Type.ROOM).stream()
                .map(res -> {
                    ResidenceDTO dto = modelMapper.map(res, ResidenceDTO.class);
                    dto.setImages(
                            res.getProductImages().stream()
                                    .map(img -> "/upload/residence/" + img.getFileName())
                                    .toList()
                    );
                    return dto;
                }).toList();
    }

}
