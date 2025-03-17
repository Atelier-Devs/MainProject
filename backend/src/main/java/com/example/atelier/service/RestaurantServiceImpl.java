package com.example.atelier.service;

import com.example.atelier.domain.*;
import com.example.atelier.dto.RestaurantDTO;
import com.example.atelier.repository.RestaurantRepository;
import com.example.atelier.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class RestaurantServiceImpl implements RestaurantService{
    private final ModelMapper modelMapper;
    private final RestaurantRepository restaurantRepository;
    private final UserRepository userRepository;

    // 모든 레스토랑 조회(관리자모드)
    @Override
    public List<RestaurantDTO> getAllRestaurants() {
        List<Restaurant> result = restaurantRepository.findAll(); // 엔티티 타입 전부 찾아오기
        List<RestaurantDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성
        result.forEach(i -> {
            RestaurantDTO data = modelMapper.map(i, RestaurantDTO.class); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });
        return resultDtoList;
    }

    // 특정 사용자의 레스토랑 조회(관리자모드)
    @Override
    public List<RestaurantDTO> getRestaurantById(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("해당 사용자가 존재하지 않습니다."));
        List<Restaurant> result = restaurantRepository.findByUserId(userId); // 엔티티 타입 전부 찾아오기
        System.out.println("result:" +result);
        List<RestaurantDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성
        result.forEach(i -> {
            RestaurantDTO data = modelMapper.map(i, RestaurantDTO.class); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });
        return resultDtoList;
    }

    // 레스토랑 수정(관리자모드)
    @Override
    public RestaurantDTO updateRestaurant(Integer id, RestaurantDTO restaurantDTO) {
        // 카테고리에 해당하는 멤버십을 찾는다
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("레스토랑을 찾을 수 없습니다."));

        // DTO로 전달된 값으로 데이터 수정
        restaurant.setName(restaurantDTO.getName());
        restaurant.setPrice(restaurantDTO.getPrice());

        // 수정된 데이터 저장
        restaurantRepository.save(restaurant);
        return modelMapper.map(restaurant, RestaurantDTO.class);
    }

    // 레스토랑 삭제(관리자모드)
    @Override
    public void deleteRestaurant(Integer id) {
        Restaurant restaurant = restaurantRepository.findById(id).orElseThrow(() -> new RuntimeException("Restaurant not found"));
        restaurantRepository.delete(restaurant);
    }
}
