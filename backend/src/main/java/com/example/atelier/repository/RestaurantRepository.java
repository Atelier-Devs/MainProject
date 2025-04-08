package com.example.atelier.repository;

import com.example.atelier.domain.Product;
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
        String key = "restaurant" + restaurant.getId();
        List<String> imageUrls = restaurant.getProductImages().stream()
                .map(Product::getFilePath)
                .filter(path -> path.contains(key))
                .sorted()
                .limit(3)
                .collect(Collectors.toList());

        return new RestaurantDTO(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getPrice(),
//                restaurant.getItems(),
                restaurant.getUser() != null ? restaurant.getUser().getId() : null,
                imageUrls
        );
    }

}