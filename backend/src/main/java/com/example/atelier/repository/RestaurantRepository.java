package com.example.atelier.repository;

import com.example.atelier.domain.Restaurant;
import com.example.atelier.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
    List<Restaurant> findByUserId(Integer userId);
}
