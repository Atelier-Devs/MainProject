package com.example.atelier.repository;

import com.example.atelier.domain.Restaurant;
import com.example.atelier.dto.RestaurantDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
    List<Restaurant> findByUserId(Integer userId);

    default RestaurantDTO toDTO(Restaurant restaurant) {
        List<String> imageUrls = restaurant.getProductImages().stream()
                .map(p -> p.getFilePath())
                .collect(Collectors.toList());

        Integer itemId = restaurant.getItem() != null ? restaurant.getItem().getId() : null;
        Integer userId = restaurant.getUser() != null ? restaurant.getUser().getId() : null;

        return new RestaurantDTO(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getPrice(),
                itemId,
                userId,
                imageUrls
        );
    }
}
