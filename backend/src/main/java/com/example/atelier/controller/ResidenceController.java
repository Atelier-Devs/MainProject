package com.example.atelier.controller;


import com.example.atelier.dto.ResidenceDTO;
import com.example.atelier.repository.UserRepository;
import com.example.atelier.service.ResidenceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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

    // GET
    @GetMapping("/list")
    public List<ResidenceDTO> get() {
        return residenceService.get();
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String delete (@PathVariable Integer id){
        residenceService.delete(id);
        return "DELETE SUCCESS";
    }
}
