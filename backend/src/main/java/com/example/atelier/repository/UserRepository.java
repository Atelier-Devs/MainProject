package com.example.atelier.repository;

import com.example.atelier.domain.User;
import com.example.atelier.dto.UserStatDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface  UserRepository extends  JpaRepository<User,Integer>{
    boolean existsByEmail(String email); // email 중복 확인
    Optional<User> findByEmail(String email);// 이메일로 사용자 조회
    @Query("SELECT u FROM User u WHERE u.roleNames = 'STAFF'")
    List<User> findAllAdmins();

    @Query("SELECT new com.example.atelier.dto.UserStatDTO(u.name, u.totalSpent) " +
            "FROM User u ORDER BY u.totalSpent DESC")
    List<UserStatDTO> findTopUsersByTotalSpent(Pageable pageable);

    Optional<User> findByNameAndPhone(String name, String phone);

}