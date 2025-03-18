package com.example.atelier.controller;

import com.example.atelier.dto.RestaurantDTO;
import com.example.atelier.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/atelier/restaurant")
@Slf4j
public class RestaurantController {
    private final RestaurantService restaurantService;

    // 모든 레스토랑 조회(관리자모드)
    @GetMapping("/all")
    public ResponseEntity<List<RestaurantDTO>> getAllRoomServices() {
        try {
            List<RestaurantDTO> restaurants = restaurantService.getAllRestaurants();
            return ResponseEntity.ok(restaurants);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    // 특정 사용자의 레스토랑 조회(관리자모드)
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RestaurantDTO>> getRestaurantsByUser(@PathVariable Integer userId) {
        List<RestaurantDTO> restaurants = restaurantService.getRestaurantById(userId);
        return ResponseEntity.ok(restaurants);
    }

    // 레스토랑 수정(관리자모드)
    @PutMapping("/{id}")
    public ResponseEntity<RestaurantDTO> updateRestaurant(@PathVariable Integer id,
                                                            @RequestBody RestaurantDTO restaurantDTO) {
        restaurantDTO.setId(id);
        RestaurantDTO updatedRestaurant = restaurantService.updateRestaurant(id, restaurantDTO);
        if (updatedRestaurant == null) { // null 체크
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(updatedRestaurant); // 수정된 DTO 반환
    }

    // 레스토랑 삭제(관리자모드)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Integer id) {
        restaurantService.deleteRestaurant(id);
        return ResponseEntity.noContent().build();
    }
}