package com.example.atelier.repository;

import com.example.atelier.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // EntityGraph를 JPQL과 함께 사용하는 방법
    @EntityGraph(attributePaths = {"residence", "bakery", "roomService", "restaurant"})
    @Query("select p from Product p where p.id = :id")
    Optional<Product> selectOne(@Param("id") Integer id);

//    @Modifying
//    @Query("update Product p set p.delFlag = :flag where p.pno = :pno")
//    void updateToDelete(@Param("pno") Integer pno, @Param("flag") boolean flag);
//
//    @Query("select p, pi from Product p left join p.imageList pi where pi.ord = 0 and p.delFlag = false")
//    Page<Object[]> selectList(Pageable pageable);
}
