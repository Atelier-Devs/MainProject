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
    private String id;               // 리뷰 ID
    private String  userId;           // 사용자 ID
    private String residenceId;       // 숙소 ID
    private String rating;            // 평점
    private String title;              //제목
    private String comment;            // 리뷰 내용
    private Timestamp createdAt;      // 생성된 시간

}
