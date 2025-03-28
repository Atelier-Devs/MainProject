package com.example.atelier.domain;



import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@Entity
@ToString
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String fileName; // 원본 파일명
    private String filePath; // 파일 저장 경로
    private String fileType; // 파일 확장자 (예: jpg, png 등)

    @Column(name = "del_flag", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean delFlag;

    @ManyToOne
    @JoinColumn(name = "residence_id", nullable = true)
    private Residence residence;

    @ManyToOne
    @JoinColumn(name = "bakery_id", nullable = true)
    private Bakery bakery;

    @ManyToOne
    @JoinColumn(name = "room_service_id", nullable = true)
    private RoomService roomService;

    @ManyToOne
    @JoinColumn(name = "restaurant_id", nullable = true)
    private Restaurant restaurant;

    @PreRemove // 삭제하기 전에 관계만 정리
    public void preRemove() {
        this.residence = null;
        this.bakery = null;
        this.roomService = null;
        this.restaurant = null;
    }
}
