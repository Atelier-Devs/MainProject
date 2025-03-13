package com.example.atelier.service;

import com.example.atelier.domain.Item;
import com.example.atelier.domain.Review;
import com.example.atelier.dto.ItemDTO;
import com.example.atelier.dto.ReviewDTO;

import java.util.List;

public interface ReviewService {
    Review register(ReviewDTO reviewDTO);
    List<ReviewDTO> get(Integer userId);
    List<ReviewDTO> getAllReviews();
    ReviewDTO modify(Integer id, ReviewDTO reviewDTO);
    void remove(Integer id);
}
