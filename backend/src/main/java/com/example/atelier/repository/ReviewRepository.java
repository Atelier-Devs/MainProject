package com.example.atelier.repository;

import com.example.atelier.domain.Reservation;
import com.example.atelier.domain.Review;
import com.example.atelier.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Integer> {
    List<Review> findByUserId(User user);
}
