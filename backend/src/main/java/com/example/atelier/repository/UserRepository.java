package com.example.atelier.repository;

import com.example.atelier.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface  UserRepository extends  JpaRepository<User,Integer>{
    boolean existsByEmail(String email); // email 중복 확인
    Optional<User> findByEmail(String email);// 이메일로 사용자 조회
}