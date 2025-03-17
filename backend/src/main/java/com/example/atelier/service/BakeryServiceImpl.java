package com.example.atelier.service;

import com.example.atelier.domain.Bakery;
import com.example.atelier.domain.User;
import com.example.atelier.dto.BakeryDTO;
import com.example.atelier.dto.RestaurantDTO;
import com.example.atelier.repository.BakeryRepository;
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
public class BakeryServiceImpl implements BakeryService{
    private final ModelMapper modelMapper;
    private final BakeryRepository bakeryRepository;
    private final UserRepository userRepository;

    // 모든 베이커리 조회(관리자모드)
    @Override
    public List<BakeryDTO> getAllBakeries() {
        List<Bakery> result = bakeryRepository.findAll(); // 엔티티 타입 전부 찾아오기
        List<BakeryDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성
        result.forEach(i -> {
            BakeryDTO data = modelMapper.map(i, BakeryDTO.class); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });
        return resultDtoList;
    }

    // 특정 사용자의 베이커리 조회(관리자모드)
    @Override
    public List<BakeryDTO> getBakeryById(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("해당 사용자가 존재하지 않습니다."));
        List<Bakery> result = bakeryRepository.findByUserId(userId); // 엔티티 타입 전부 찾아오기
        System.out.println("result:" +result);
        List<BakeryDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성
        result.forEach(i -> {
            BakeryDTO data = modelMapper.map(i, BakeryDTO.class); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });
        return resultDtoList;
    }

    // 베이커리 수정(관리자모드)
    @Override
    public BakeryDTO updateBakery(Integer id, BakeryDTO bakeryDTO) {
        // 카테고리에 해당하는 베이커리를 찾는다
        Bakery bakery = bakeryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("베이커리를 찾을 수 없습니다."));

        // DTO로 전달된 값으로 데이터 수정
        bakery.setName(bakeryDTO.getName());
        bakery.setPrice(bakeryDTO.getPrice());

        // 수정된 데이터 저장
        bakeryRepository.save(bakery);
        return modelMapper.map(bakery, BakeryDTO.class);
    }

    // 베이커리 삭제(관리자모드)
    @Override
    public void deleteBakery(Integer id) {
        Bakery bakery = bakeryRepository.findById(id).orElseThrow(() -> new RuntimeException("Bakery not found"));
        bakeryRepository.delete(bakery);
    }
}
