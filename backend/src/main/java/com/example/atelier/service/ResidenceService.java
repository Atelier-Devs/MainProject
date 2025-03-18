package com.example.atelier.service;

import com.example.atelier.dto.ResidenceDTO;

import java.util.List;

public interface ResidenceService {
    // 객실 생성(관리자모드)
    Integer register(ResidenceDTO residenceDTO);

    // 객실 조회
    List<ResidenceDTO> get();

    // 객실 수정(관리자모드)
    void modify(ResidenceDTO residenceDTO);

    // 객실 삭제(관리자모드)
    void delete(Integer id);
}
