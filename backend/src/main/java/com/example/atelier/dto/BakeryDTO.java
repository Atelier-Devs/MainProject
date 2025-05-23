package com.example.atelier.dto;

import com.example.atelier.domain.Item;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BakeryDTO {
    private Integer id;
    private String name;
    private String price;
//    private Item items;
    private Integer userId;
    private List<String> images; // 이미지
}
