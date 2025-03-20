package com.example.atelier.repository;

import com.example.atelier.domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<User, String> {
    @Query("select m from User m where m.email = :email")
    Optional<User> getWithRoles(@Param("email") String email);
}
