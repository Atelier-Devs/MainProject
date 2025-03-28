package com.example.atelier.repository;

import com.example.atelier.domain.Bakery;
import com.example.atelier.domain.User;
import com.example.atelier.dto.BakeryDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public interface BakeryRepository extends JpaRepository<Bakery, Integer> {
    List<Bakery> findByUserId(Integer userId);

    default BakeryDTO toDTO(Bakery bakery) {
        List<String> imageUrls = bakery.getProductImages().stream()
                .map(p -> p.getFilePath())
                .collect(Collectors.toList());

        Integer itemId = bakery.getItem() != null ? bakery.getItem().getId() : null;
        Integer userId = bakery.getUser() != null ? bakery.getUser().getId() : null;

        return new BakeryDTO(
                bakery.getId(),
                bakery.getName(),
                bakery.getPrice(),
                itemId,
                userId,
                imageUrls
        );
    }
}
