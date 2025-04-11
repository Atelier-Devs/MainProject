package com.example.atelier.service;

import com.example.atelier.domain.Residence;
import com.example.atelier.domain.Review;
import com.example.atelier.domain.User;
import com.example.atelier.dto.ReviewDTO;
import com.example.atelier.repository.ResidenceRepository;
import com.example.atelier.repository.ReviewRepository;
import com.example.atelier.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ReviewServiceServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ResidenceRepository residenceRepository;
    private final ModelMapper modelMapper;

    /**
     * 리뷰 등록
     */
    @Override
    public Review register(ReviewDTO reviewDTO) {
        User user = userRepository.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("해당 유저를 찾을 수 없습니다."));
        Residence residence = residenceRepository.findById(reviewDTO.getResidenceId())
                .orElseThrow(() -> new RuntimeException("해당 숙소를 찾을 수 없습니다."));

        Review review = modelMapper.map(reviewDTO, Review.class);
        review.setUser(user);
        review.setResidence(residence);
        review.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));

        return reviewRepository.save(review);
    }

    /**
     * 특정 사용자 리뷰 목록 조회
     */
    @Override
    public List<ReviewDTO> get(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("해당 사용자가 존재하지 않습니다."));
        return reviewRepository.findByUserId(user.getId())
                .stream()
                .map(review -> modelMapper.map(review, ReviewDTO.class))
                .collect(Collectors.toList());
    }

    /**
     * 전체 리뷰 조회
     */
    @Override
    public List<ReviewDTO> getAllReviews() {
        return reviewRepository.findAll()
                .stream()
                .map(review -> modelMapper.map(review, ReviewDTO.class))
                .collect(Collectors.toList());
    }

    /**
     * 리뷰 수정
     */
    @Override
    public ReviewDTO modify(Integer id, ReviewDTO reviewDTO) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 리뷰가 존재하지 않습니다."));

        review.setRating(reviewDTO.getRating());
        review.setTitle(reviewDTO.getTitle());
        review.setComment(reviewDTO.getComment());

        Review updated = reviewRepository.save(review);
        return modelMapper.map(updated, ReviewDTO.class);
    }

    /**
     * 리뷰 단건 조회
     */
    @Override
    public ReviewDTO getReviewById(Integer id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 리뷰가 존재하지 않습니다."));
        return ReviewDTO.fromEntity(review);
    }

    /**
     * 리뷰 삭제
     */
    @Override
    public void remove(Integer id) {
        reviewRepository.deleteById(id);
    }
}
