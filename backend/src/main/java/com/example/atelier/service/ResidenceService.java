package com.example.atelier.service;

import com.example.atelier.domain.Product;
import com.example.atelier.domain.Residence;
import com.example.atelier.dto.ResidenceDTO;

import java.util.List;
import java.util.stream.Collectors;

public interface ResidenceService {
    // 객실 생성(관리자모드)
    Integer register(ResidenceDTO residenceDTO);

    // 객실 조회
    List<ResidenceDTO> get();

    // 객실 수정(관리자모드)
    void modify(ResidenceDTO residenceDTO);

    // 객실 삭제(관리자모드)
    void delete(Integer id);

    // 객실 전체 조회(서버시작 시)
    List<ResidenceDTO> getAllRooms();
    ResidenceDTO getById(Integer id);


}
