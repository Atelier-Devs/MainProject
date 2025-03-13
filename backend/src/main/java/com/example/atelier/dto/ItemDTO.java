package com.example.atelier.dto;

import com.example.atelier.domain.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemDTO {
    private Integer id; // 아이템 ID
    private String name; // 아이템 이름
    private BigDecimal price; // 아이템 가격
    private Item.Category category; // 아이템 카테고리
}
