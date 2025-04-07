package com.example.atelier.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RestaurantDTO {
    private Integer id;
    private String name;
    private String price;
    private Integer itemId;
    private Integer userId;
    private List<String> images; // 이미지
}
