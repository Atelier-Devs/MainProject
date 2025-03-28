package com.example.atelier.repository;

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

    default RoomServiceDTO toDTO(RoomService rs) {
        List<String> imageUrls = rs.getProductImages().stream()
                .map(p -> p.getFilePath())
                .collect(Collectors.toList());

        Integer itemId = rs.getItem() != null ? rs.getItem().getId() : null;
        Integer userId = rs.getUser() != null ? rs.getUser().getId() : null;

        return new RoomServiceDTO(
                rs.getId(),
                rs.getName(),
                rs.getPrice(),
                itemId,
                userId,
                imageUrls
        );
    }
}
