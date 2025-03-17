package com.example.atelier.service;

import com.example.atelier.domain.Bakery;
import com.example.atelier.dto.BakeryDTO;

import java.util.List;

public interface BakeryService {
    // 모든 베이커리 조회(관리자모드)
    List<BakeryDTO> getAllBakeries();

    // 특정 사용자의 베이커리 조회(관리자모드)
    List<BakeryDTO> getBakeryById(Integer userId);

    // 베이커리 수정(관리자모드)
    BakeryDTO updateBakery(Integer id, BakeryDTO bakeryDTO);

    // 베이커리 삭제(관리자모드)
    void deleteBakery(Integer id);
}
