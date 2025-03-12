package com.example.atelier.repository;

import com.example.atelier.domain.Membership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MembershipRepository extends JpaRepository<Membership,Integer> {
}
