package com.example.atelier.repository;

import com.example.atelier.domain.Product;
import com.example.atelier.domain.RoomService;
import com.example.atelier.domain.User;
import com.example.atelier.dto.RoomServiceDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public interface RoomServiceRepository extends JpaRepository<RoomService, Integer> {
    List<RoomService> findByUserId(Integer userId);

    default RoomServiceDTO toDTO(RoomService roomService) {
        String key = "roomservice" + roomService.getId();
        List<String> imageUrls = roomService.getProductImages().stream()
                .map(Product::getFilePath)
                .filter(path -> path.contains(key))
                .sorted()
                .limit(3)
                .collect(Collectors.toList());

        return new RoomServiceDTO(
                roomService.getId(),
                roomService.getName(),
                roomService.getPrice(),
                roomService.getItem() != null ? roomService.getItem().getId() : null,
                roomService.getUser() != null ? roomService.getUser().getId() : null,
                imageUrls
        );
    }

}