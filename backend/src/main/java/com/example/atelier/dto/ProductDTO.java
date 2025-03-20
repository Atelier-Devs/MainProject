package com.example.atelier.dto;

import com.example.atelier.domain.Bakery;
import com.example.atelier.domain.Residence;
import com.example.atelier.domain.Restaurant;
import com.example.atelier.domain.RoomService;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Integer id;
    private String fileName; // 파일명
    private String filePath; // 파일 저장 경로
    private String fileType; // 파일 확장자 (예: jpg, png 등)
    private boolean delFlag; // 삭제 여부

    // 연관된 엔티티를 직접 참조
    private Bakery bakery;
    private Restaurant restaurant;
    private RoomService roomService;
    private Residence residence;

    @Builder.Default // 새롭게 서버에 보내지는 실제 파일 데이터 리스트
    private List<MultipartFile> files = new ArrayList<>();

    @Builder.Default // 업로드가 완료된 파일의 이름을 문자열로 보관한 리스트
    private List<String> uploadFileNames = new ArrayList<>();
}
