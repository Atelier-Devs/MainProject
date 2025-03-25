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
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ReviewServiceServiceImpl implements ReviewService{
    private final ReviewRepository reviewRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final ResidenceRepository residenceRepository;

    // 리뷰 생성
    @Override
    public Review register(ReviewDTO reviewDTO) {
        // 유저 조회
        User user = userRepository.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("해당 유저를 찾을 수 없습니다"));
        // 객실 조회
        Residence residence = residenceRepository.findById(reviewDTO.getResidenceId())
                .orElseThrow(() -> new RuntimeException("해당 숙소를 찾을 수 없습니다"));

        Review review = modelMapper.map(reviewDTO, Review.class);

        review.setUser(user);
        review.setResidence(residence);
        review.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));

        return reviewRepository.save(review);
    }


    // 특정 리뷰 조회
    @Override
    public List<ReviewDTO> get(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("해당 사용자가 존재하지 않습니다."));
        List<Review> result = reviewRepository.findByUserId(user.getId()); // 특정 ID의 엔티티 조회
        List<ReviewDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성

        result.forEach(i -> {
            ReviewDTO data = modelMapper.map(i, ReviewDTO.class); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });
        return resultDtoList; // 결과 DTO 리스트 반환
    }

    // 모든 리뷰 조회(관리자모드)
    @Override
    public List<ReviewDTO> getAllReviews() {
        List<Review> result = reviewRepository.findAll(); // 모든 리뷰 조회
        List<ReviewDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성

        result.forEach(i -> {
            ReviewDTO data = modelMapper.map(i, ReviewDTO.class); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });
        return resultDtoList; // 결과 DTO 리스트 반환
    }

    // 리뷰 수정
    @Override
    public ReviewDTO modify(Integer id, ReviewDTO reviewDTO) {
        // 아이템 조회 및 수정
        Review updatedReview = reviewRepository.findById(id)
                .map(reveiw -> {
                    reveiw.setRating(reviewDTO.getRating());
                    reveiw.setComment(reviewDTO.getComment());
                    return reviewRepository.save(reveiw); // 수정된 아이템 저장
                })
                .orElseThrow(() -> new RuntimeException("해당 리뷰가 존재하지 않습니다."));

        // Item 엔티티를 ItemDTO로 변환하여 반환
        return modelMapper.map(updatedReview, ReviewDTO.class);
    }

    @Override
    public void remove(Integer id) {
        reviewRepository.deleteById(id);
    }
}
