package com.example.atelier.repository;

import com.example.atelier.domain.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoucherRepository extends JpaRepository<Voucher,Integer> {
}
