package com.example.atelier.controller;


import com.example.atelier.dto.ResidenceDTO;
import com.example.atelier.repository.UserRepository;
import com.example.atelier.service.ResidenceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/atelier/residence")
@Slf4j
public class ResidenceController {
    private final ResidenceService residenceService;

    // POST
    @PostMapping("/")
    public String register(@RequestBody ResidenceDTO residenceDTO) {
        residenceService.register(residenceDTO);
        return "성공";
    }

    // PUT
    @PutMapping("/modify/{sno}")
    public Map<String, String> modify(@PathVariable Integer id, @RequestBody ResidenceDTO residenceDTO) {
        residenceDTO.setId(id);
        log.info("Modify: " + residenceDTO);
        residenceService.modify(residenceDTO);
        return Map.of("RESULT", "성공");
    }

    // GET(프론트에서 출력)
    @GetMapping("/list")
    public ResponseEntity<List<ResidenceDTO>> get() {
        System.out.println("residence list : ");
        List<ResidenceDTO> list = residenceService.get();
        System.out.println("list" +list);
        return ResponseEntity.ok(list);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String delete (@PathVariable Integer id){
        residenceService.delete(id);
        return "DELETE SUCCESS";
    }

    // GET(이미지 조회)
//    @GetMapping("/a")
//    public ResponseEntity<List<ResidenceDTO>> getAllRooms() {
//        System.out.println("여기는 분명 들어오는데 service에서 문제가 있은듯 ");
//        return ResponseEntity.ok(residenceService.getAllRooms());
//    }
}
