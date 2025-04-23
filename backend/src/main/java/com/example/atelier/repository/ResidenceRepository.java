package com.example.atelier.repository;

import com.example.atelier.domain.Product;
import com.example.atelier.domain.Residence;
import com.example.atelier.dto.ResidenceDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public interface ResidenceRepository extends JpaRepository<Residence,Integer> {
    List<Residence> findAllByType(Residence.Type type);

    default ResidenceDTO toDTO(Residence residence) {
        String key = "room" + residence.getId(); // ID 기반 키 생성
        List<String> imageUrls = residence.getProductImages().stream()
                .map(Product::getFilePath)
                .filter(path -> path.contains(key)) // roomN 과 일치
                .sorted()
                .distinct()
                .limit(3)
                .collect(Collectors.toList());

        return new ResidenceDTO(
                residence.getId(),
                residence.getType(),
                residence.getName(),
                residence.getDescription(),
                residence.getPrice(),
                residence.getCapacity(),
                residence.getStatus(),
                imageUrls
        );
    }

}
