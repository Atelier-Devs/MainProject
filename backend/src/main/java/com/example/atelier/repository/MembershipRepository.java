package com.example.atelier.repository;

import com.example.atelier.domain.Membership;
import com.example.atelier.domain.Reservation;
import com.example.atelier.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MembershipRepository extends JpaRepository<Membership,Integer> {
    List<Membership> findByUserId(Integer userId);
//    Optional<Membership> findByCategory(Membership.Category category);
}
