package com.example.atelier.service;

import com.example.atelier.domain.Item;
import com.example.atelier.domain.User;
import com.example.atelier.dto.ItemDTO;
import com.example.atelier.repository.ItemRepository;
import com.example.atelier.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ItemServiceImpl implements ItemService{

    private final ItemRepository itemRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

//    // POST
//    @Override
//    public Item register(ItemDTO itemDTO){
//        Item item = modelMapper.map(itemDTO, Item.class);
//
//        // Category에 따른 가격 설정
//        BigDecimal price = calculatePrice(item.getCategory());
//        // Item에 가격 적용
//        itemDTO.setPrice(price);
//
//        // DB에 저장
//        return itemRepository.save(item);
//    }
//
//    // 카테고리별 가격 계산 메서드
//    private BigDecimal calculatePrice(Item.Category category) {
//        switch (category) {
//            case RESTAURANT:
//                return new BigDecimal("100000"); // 10만원
//            case ROOM_SERVICE:
//                return new BigDecimal("100000"); // 10만원
//            case BAKERY:
//                return new BigDecimal("50000"); // 5만원
//            default:
//                return BigDecimal.ZERO; // 기본값 (0원)
//        }
//    }

    // 특정 ID 조회
    @Override
    public List<ItemDTO> get(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("해당 사용자가 존재하지 않습니다."));

        List<Item> result = itemRepository.findByUserId(user); // 특정 ID의 엔티티 조회
        List<ItemDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성

        result.forEach(i -> {
            ItemDTO data = modelMapper.map(i, ItemDTO.class); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });

        return resultDtoList; // 결과 DTO 리스트 반환
    }

    // 모든 아이템 조회(관리자모드)
    @Override
    public List<ItemDTO> getAllItems() {
        List<Item> result = itemRepository.findAll(); // 모든 아이템 조회
        List<ItemDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성

        result.forEach(i -> {
            ItemDTO data = modelMapper.map(i, ItemDTO.class); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });
        return resultDtoList; // 결과 DTO 리스트 반환
    }

//    // PUT
//    @Override
//    public ItemDTO modify(Integer id, ItemDTO itemDTO) {
//        // 아이템 조회 및 수정
//        Item updatedItem = itemRepository.findById(id)
//                .map(item -> {
//                    item.setName(itemDTO.getName());
//                    item.setPrice(itemDTO.getPrice());
//                    item.setCategory(itemDTO.getCategory());
//                    return itemRepository.save(item); // 수정된 아이템 저장
//                })
//                .orElseThrow(() -> new RuntimeException("해당 아이템이 존재하지 않습니다."));
//
//        // Item 엔티티를 ItemDTO로 변환하여 반환
//        return modelMapper.map(updatedItem, ItemDTO.class);
//    }


    // DELETE
    @Override
    public void remove(Integer id) {
        itemRepository.deleteById(id);
    }
}
