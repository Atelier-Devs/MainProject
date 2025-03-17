package com.example.atelier.service;

import com.example.atelier.domain.Restaurant;
import com.example.atelier.dto.RestaurantDTO;

import java.util.List;

public interface RestaurantService {
    // 모든 레스토랑 조회(관리자모드)
    List<RestaurantDTO> getAllRestaurants();

    // 특정 사용자의 레스토랑 조회(관리자모드)
    List<RestaurantDTO> getRestaurantById(Integer userId);

    // 레스토랑 수정(관리자모드)
    RestaurantDTO updateRestaurant(Integer id, RestaurantDTO restaurantDTO);

    // 레스토랑 삭제(관리자모드)
    void deleteRestaurant(Integer id);
}
