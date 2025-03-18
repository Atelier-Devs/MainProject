package com.example.atelier.repository;

import com.example.atelier.domain.RoomService;
import com.example.atelier.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomServiceRepository extends JpaRepository<RoomService, Integer> {
    List<RoomService> findByUserId(Integer userId);
}
