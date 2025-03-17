package com.example.atelier.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantDTO {
    private Integer id;
    private String name;
    private String price;
    private Integer itemId;
    private Integer userId;
}
