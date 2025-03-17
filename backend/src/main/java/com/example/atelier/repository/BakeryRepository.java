package com.example.atelier.repository;

import com.example.atelier.domain.Bakery;
import com.example.atelier.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BakeryRepository extends JpaRepository<Bakery, Integer> {
    List<Bakery> findByUserId(Integer userId);
}
