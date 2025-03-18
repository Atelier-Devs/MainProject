package com.example.atelier.dto;

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
    private Integer itemId;
    private Integer userId;
}
