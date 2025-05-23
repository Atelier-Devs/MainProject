package com.example.atelier.controller;

import com.example.atelier.domain.Review;
import com.example.atelier.dto.ReviewDTO;
import com.example.atelier.service.ReviewService;
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
        System.out.println("ReviewDTO: " + reviewDTO);
        System.out.println("userId: " + reviewDTO.getUserId());
        System.out.println("residenceId: " + reviewDTO.getResidenceId());
        Review review = reviewService.register(reviewDTO);
        return ResponseEntity.ok(review);
    }

    // 특정 사용자 리뷰 목록 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> search(@PathVariable Integer userId) {
        List<ReviewDTO> reviewDTO = reviewService.get(userId);
        return ResponseEntity.ok(reviewDTO);
    }

    // 모든 리뷰 조회 (관리자용)
    @GetMapping("/")
    public ResponseEntity<List<ReviewDTO>> searchAll() {
        try {
            List<ReviewDTO> reviewList = reviewService.getAllReviews();
            return ResponseEntity.ok(reviewList);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    // 리뷰 수정 (✅ URL 변수명을 id로 수정)
    @PutMapping("/modify/{id}")
    public ResponseEntity<ReviewDTO> modifyReview(@RequestBody ReviewDTO reviewDTO, @PathVariable Integer id) {
        reviewDTO.setId(id);
        ReviewDTO modifiedReview = reviewService.modify(id, reviewDTO);
        if (modifiedReview == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(modifiedReview);
    }

    // 리뷰 ID로 단일 리뷰 조회
    @GetMapping("/{id}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable Integer id) {
        ReviewDTO reviewDTO = reviewService.getReviewById(id);
        if (reviewDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(reviewDTO);
    }

    // 리뷰 삭제
    @DeleteMapping("/{id}")
    public void remove(@PathVariable Integer id) {
        reviewService.remove(id);
    }
}
