package com.example.atelier.repository;

import com.example.atelier.domain.Order;
import com.example.atelier.domain.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.user.id = :userId AND p.paymentStatus = 'COMPLETED'")
    BigDecimal getTotalSpentByUser(@Param("userId") Integer userId);

    List<Payment> findByUserId(Integer userId);

}
