package com.example.atelier.repository;

import com.example.atelier.domain.Item;
import com.example.atelier.domain.Review;
import com.example.atelier.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
    List<Item> findByUserId(User user);

    //이 로직은 item 자체가 목적이 아니라,
    //item이 가지고 있는 자식 테이블(Restaurant, Bakery, RoomService)의 정보 중 이름과 가격만 뽑는 것이 목적
    @Query("SELECT i FROM Item i WHERE i.payment.id = :paymentId")
    List<Item> findByPaymentId(@Param("paymentId") Integer paymentId);


}
