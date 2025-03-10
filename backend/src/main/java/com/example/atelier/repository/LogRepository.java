package com.example.atelier.repository;

import com.example.atelier.domain.Log;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogRepository extends JpaRepository<Log,Integer> {
}
