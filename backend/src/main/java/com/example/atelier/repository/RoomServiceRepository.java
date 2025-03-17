package com.example.atelier.repository;

import com.example.atelier.domain.RoomService;
import com.example.atelier.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomServiceRepository extends JpaRepository<RoomService, Integer> {
    List<RoomService> findByUserId(Integer userId);
}
