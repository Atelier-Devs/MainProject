package com.example.atelier.repository;

import com.example.atelier.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer> {

//    value="",nativeQuery = true
    @Query("SELECT o FROM Order o WHERE o.user.email = :email")
    List<Order> findByUserEmail(@Param("email") String email);

    @Query("SELECT o FROM Order o WHERE o.user.email = :email and o.residence. id= :id")
    List<Order> findByUserEmailAndResidenceId(@Param("email") String email ,@Param("id") Integer id);
}
