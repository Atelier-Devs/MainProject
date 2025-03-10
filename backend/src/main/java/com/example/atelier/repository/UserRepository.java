package com.example.atelier.repository;

import com.example.atelier.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface  UserRepository extends  JpaRepository<User,Long>{
    boolean existsByEmail(String email); // email 중복 확인
    User findByEmail(String email); // 이메일로 사용자 조회
}