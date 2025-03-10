package com.example.atelier.repository;

import com.example.atelier.domain.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff,Integer> {
}
