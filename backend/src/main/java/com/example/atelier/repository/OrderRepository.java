package com.example.atelier.repository;

import com.example.atelier.domain.Order;
import com.example.atelier.dto.OrderDTO;
import com.example.atelier.dto.ResidenceStatDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {
    //    value="",nativeQuery = true
    @Query("SELECT o FROM Order o WHERE o.user.email = :email")
    List<Order> findByUserEmail(@Param("email") String email);

//    @Query("SELECT o FROM Order o WHERE o.user.email = :email and o.residence. id= :id")
//    List<Order> findByUserEmailAndResidenceId(@Param("email") String email ,@Param("id") Integer id);

    @Query("SELECT o FROM Order o WHERE o.user.email = :email and o.reservation.id = :id")
    List<Order> findByUserEmailAndResidenceId(@Param("email") String email, @Param("id") Integer id);

    @Query("SELECT o FROM Order o WHERE o.reservation.id = :reservationId")
    Optional<Order> findByReservationId(@Param("reservationId") Integer reservationId);



    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE o.paymentStatus = 'COMPLETED'")
    BigDecimal getTotalPaymentAmount();

    Long countByRefundStatus(Order.RefundStatus status);

    @Query("SELECT new com.example.atelier.dto.ResidenceStatDTO(o.reservation.residence.name, COUNT(o)) " +
            "FROM Order o GROUP BY o.reservation.residence.name ORDER BY COUNT(o) DESC")
    List<ResidenceStatDTO> getPopularRooms();

    List<Order> findByUserId(Integer userId);
}
