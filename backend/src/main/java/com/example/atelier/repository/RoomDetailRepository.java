package com.example.atelier.repository;

import com.example.atelier.domain.RoomDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomDetailRepository extends JpaRepository<RoomDetail,Integer> {
}
