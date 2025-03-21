package com.example.atelier.controller;

import com.example.atelier.domain.Review;
import com.example.atelier.dto.ReviewDTO;
import com.example.atelier.service.ReviewService;
import jakarta.persistence.criteria.CriteriaBuilder;
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
@RequestMapping("/api/atelier/review")
@Slf4j
public class ReviewController {

    private final ReviewService reviewService;

    // 리뷰 생성
    @PostMapping("/register")
    public ResponseEntity<?> create(@RequestBody ReviewDTO reviewDTO) {
        System.out.println("review 등록 controller: " +reviewDTO);
        Review review = reviewService.register(reviewDTO);
        return ResponseEntity.ok(review);
    }

    // 특정 리뷰 조회
    @GetMapping("/user")
    public ResponseEntity<?> search(@PathVariable Integer userId) {
        List<ReviewDTO> reviewDTO = reviewService.get(userId);
        return ResponseEntity.ok(reviewDTO);
    }

    // 모든 리뷰 조회(관리자모드)
    @GetMapping("/")
    public ResponseEntity<List<ReviewDTO>> searchAll() {
        try {
            List<ReviewDTO> reviewList = reviewService.getAllReviews();
            return ResponseEntity.ok(reviewList);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    // 리뷰 수정
    @PutMapping("/modify/{userId}")
    public ResponseEntity<ReviewDTO> modifyReview(@RequestBody ReviewDTO reviewDTO, @PathVariable Integer id) {
        reviewDTO.setId(String.valueOf(id));
        ReviewDTO modifiedReview = reviewService.modify(id, reviewDTO);
        if (modifiedReview == null) { // null 체크
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(modifiedReview); // 수정된 리뷰 DTO 반환
    }

    // 리뷰 삭제
    @DeleteMapping("/{id}")
    public void remove(@PathVariable Integer id) {
        reviewService.remove(id);
    }
}
