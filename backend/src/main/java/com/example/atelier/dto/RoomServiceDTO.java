package com.example.atelier.dto;

import com.example.atelier.domain.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomServiceDTO {
    private Integer id;
    private String name;
    private String price;
//    private Item items;
    private Integer userId;
    private List<String> images; // 이미지
}
