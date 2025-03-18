package com.example.atelier.controller;

import com.example.atelier.domain.Item;
import com.example.atelier.dto.ItemDTO;
import com.example.atelier.repository.ItemRepository;
import com.example.atelier.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/atelier/item")
@Slf4j
public class ItemController {
    private final ItemService itemService;

//    // 아이템 생성
//    @PostMapping("/register")
//    public ResponseEntity<?> create(@RequestBody ItemDTO itemDTO) {
//        Item item = itemService.register(itemDTO);
//        return ResponseEntity.ok(item);
//    }

    // 특정 사용자 아이템 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> search(@PathVariable Integer userId) {
        List<ItemDTO> itemDTO = itemService.get(userId);
        return ResponseEntity.ok(itemDTO);
    }

    // 모든 아이템 조회(관리자모드)
    @GetMapping("/")
    public ResponseEntity<List<ItemDTO>> searchAll() {
        try {
            List<ItemDTO> itemList = itemService.getAllItems();
            return ResponseEntity.ok(itemList);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

//    // 아이템 수정
//    @PutMapping("/modify/{userId}")
//    public ResponseEntity<ItemDTO> modifyOrders(@RequestBody ItemDTO itemDTO, @PathVariable Integer id) {
//        itemDTO.setId(id);
//        ItemDTO modifiedItem = itemService.modify(id, itemDTO);
//        if (modifiedItem == null) { // null 체크
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//        return ResponseEntity.ok(modifiedItem); // 수정된 아이템 DTO 반환
//    }

    // 아이템 삭제
    @DeleteMapping("/{id}")
    public void remove(@PathVariable Integer id) {
        itemService.remove(id);
    }

}
