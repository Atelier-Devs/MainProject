package com.example.atelier.dto;

import com.example.atelier.domain.Item;
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
//    private Item items;
    private Integer userId;
    private List<String> images; // 이미지
}
