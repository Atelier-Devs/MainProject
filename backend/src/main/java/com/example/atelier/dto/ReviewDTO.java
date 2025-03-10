package com.example.atelier.dto;

import com.example.atelier.domain.Residence;
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
    private Integer id;               // 리뷰 ID
    private Integer user_id;           // 사용자 ID
    private Integer residence_id;       // 숙소 ID
    private Integer rating;            // 평점
    private String comment;            // 리뷰 내용
    private Timestamp created_at;      // 생성된 시간
}
