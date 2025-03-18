package com.example.atelier.repository;

import com.example.atelier.domain.Bakery;
import com.example.atelier.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BakeryRepository extends JpaRepository<Bakery, Integer> {
    List<Bakery> findByUserId(Integer userId);
}
