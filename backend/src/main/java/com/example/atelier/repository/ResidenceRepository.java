package com.example.atelier.repository;

import com.example.atelier.domain.Residence;
import com.example.atelier.dto.ResidenceDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public interface ResidenceRepository extends JpaRepository<Residence,Integer> {
    List<Residence> findAllByType(Residence.Type type);

    default public ResidenceDTO toDTO(Residence residence) {
        List<String> imageUrls = residence.getProductImages().stream()
                .map(i->i.getFilePath()) // Product 엔티티에 getImagePath() 메서드가 있다고 가정
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
