package com.example.atelier.repository;

import com.example.atelier.domain.Item;
import com.example.atelier.domain.Review;
import com.example.atelier.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
    List<Item> findByUserId(User user);

}
