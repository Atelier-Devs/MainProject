package com.example.atelier.controller;

import com.example.atelier.domain.Bakery;
import com.example.atelier.dto.BakeryDTO;
import com.example.atelier.dto.RestaurantDTO;
import com.example.atelier.service.BakeryService;
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
@RequestMapping("/api/atelier/bakery")
@Slf4j
public class BakeryController {
    private final BakeryService bakeryService;

    // 모든 베이커리 조회
    @GetMapping("/all")
    public ResponseEntity<List<BakeryDTO>> getAllBakeries() {
        try {
            List<BakeryDTO> restaurants = bakeryService.getAllBakeries();
            return ResponseEntity.ok(restaurants);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    // 특정 사용자의 베이커리 조회(관리자모드)
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BakeryDTO>> getBakeriesByUser(@PathVariable Integer userId) {
        List<BakeryDTO> bakeries = bakeryService.getBakeryById(userId);
        return ResponseEntity.ok(bakeries);
    }

    // 베이커리 수정(관리자모드)
    @PutMapping("/{id}")
    public ResponseEntity<BakeryDTO> updateRestaurant(@PathVariable Integer id,
                                                          @RequestBody BakeryDTO bakeryDTO) {
        bakeryDTO.setId(id);
        BakeryDTO updatedBakery = bakeryService.updateBakery(id, bakeryDTO);
        if (updatedBakery == null) { // null 체크
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(updatedBakery); // 수정된 DTO 반환
    }

    // 베이커리 삭제(관리자모드)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBakery(@PathVariable Integer id) {
        bakeryService.deleteBakery(id);
        return ResponseEntity.noContent().build();
    }
}
