package com.example.atelier.repository;

import com.example.atelier.domain.Bakery;
import com.example.atelier.domain.Product;
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
        String key = "bakery" + bakery.getId();
        List<String> imageUrls = bakery.getProductImages().stream()
                .map(Product::getFilePath)
                .filter(path -> path.contains(key))
                .sorted()
                .limit(3)
                .collect(Collectors.toList());

        return new BakeryDTO(
                bakery.getId(),
                bakery.getName(),
                bakery.getPrice(),
                bakery.getItem() != null ? bakery.getItem().getId() : null,
                bakery.getUser() != null ? bakery.getUser().getId() : null,
                imageUrls
        );
    }

}