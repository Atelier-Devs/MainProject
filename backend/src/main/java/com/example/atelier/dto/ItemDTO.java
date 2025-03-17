package com.example.atelier.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemDTO {
    private Integer id;
    private Integer userId; // user의 id
    private Integer orderId; // order의 id
    private List<Integer> restaurantIds; // 해당 아이템과 관련된 레스토랑들의 id
    private List<Integer> roomServiceIds; // 해당 아이템과 관련된 룸서비스들의 id
    private List<Integer> bakeryIds; // 해당 아이템과 관련된 베이커리들의 id
}
