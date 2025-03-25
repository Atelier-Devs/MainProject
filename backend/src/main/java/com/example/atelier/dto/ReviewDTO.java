package com.example.atelier.dto;

import com.example.atelier.domain.Residence;
import com.example.atelier.domain.Review;
import com.example.atelier.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
    private Integer id;            // 리뷰 ID
    private Integer userId;        // 사용자 ID
    private Integer residenceId;   // 숙소 ID
    private Integer rating;        // 평점
    private String title;          // 제목
    private String comment;        // 내용
    private Timestamp createdAt;   // 생성일

    public static ReviewDTO fromEntity(Review review) {
        if (review == null) return null;

        return new ReviewDTO(
                review.getId(),
                review.getUser().getId(),
                review.getResidence().getId(),
                review.getRating(),  // 타입에 따라
                review.getTitle(),
                review.getComment(),
                review.getCreatedAt()
        );
    }

}
