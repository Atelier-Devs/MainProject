package com.example.atelier.repository;

import com.example.atelier.domain.CancellationLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CancellationLogRepository extends JpaRepository<CancellationLog,Integer> {
}
