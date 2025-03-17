package com.example.atelier.service;

import com.example.atelier.domain.Item;
import com.example.atelier.dto.ItemDTO;
import com.example.atelier.dto.MembershipDTO;

import java.util.List;

public interface ItemService {
//    Item register(ItemDTO itemDTO);
    List<ItemDTO> get(Integer id);
    List<ItemDTO> getAllItems();
//    ItemDTO modify(Integer id, ItemDTO itemDTO);
    void remove(Integer id);
}
