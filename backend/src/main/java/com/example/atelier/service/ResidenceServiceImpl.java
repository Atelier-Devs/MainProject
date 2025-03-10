package com.example.atelier.service;

import com.example.atelier.domain.Residence;
import com.example.atelier.dto.ResidenceDTO;
import com.example.atelier.repository.ResidenceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ResidenceServiceImpl implements ResidenceService{

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ResidenceRepository residenceRepository;

//    // POST
//    @Override
//    public Integer register(ResidenceDTO residenceDTO) {
//        Residence residence = modelMapper.map(residenceDTO, Residence.class); // scoreDTO 객체를 Score 엔티티 객체로 변환
//        Residence savedResidence = residenceRepository.save(residence);
//        return savedResidence.getId();
//    }

    // GET
    @Override
    public List<ResidenceDTO> get() {
        List<Residence> result = residenceRepository.findAll(); // 엔티티 타입 전부 찾아오기
        List<ResidenceDTO> resultDtoList = new ArrayList<>(); // DTO타입으로 새로 담을 리스트 생성
        result.forEach(i -> {
            ResidenceDTO data = modelMapper.map(i, ResidenceDTO.class); // 엔티티를 DTO타입으로 변환
            resultDtoList.add(data); // DTO타입을 DTO리스트에 저장
        });
        return resultDtoList;
    }


//    // PUT
//    @Override
//    public void modify(ResidenceDTO residenceDTO) {
//        Optional<Residence> result = residenceRepository.findById(residenceDTO.getId()); //수정하려는 데이터 조회
//        Residence residence = result.orElseThrow();
//        residence.changeType(residenceDTO.getType());
//        residence.changeName(residenceDTO.getName());
//        residence.changePrice(residenceDTO.getPrice());
//        residence.changeCapacity(residenceDTO.getCapacity());
//        residence.changeStatus(residenceDTO.getStatus());
//        residenceRepository.save(residence);
//    }
}
