package com.example.atelier.controller;

import com.example.atelier.dto.ResidenceDTO;
import com.example.atelier.repository.UserRepository;
import com.example.atelier.service.ResidenceService;
import com.example.atelier.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/atelier/residence")
@Slf4j
public class ResidenceController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ResidenceService residenceService;
    @Autowired
    private ModelMapper modelMapper;

//    // POST
//    @PostMapping("/")
//    public String register(@RequestBody ScoreDTO scoreDTO) {
//        scoreService.register(scoreDTO); // 서비스에서 생성된 ScoreDTO를 가져옴
//        return "성공";
//    }
//
//    // PUT
//    @PutMapping("/modify/{sno}")
//    public Map<String, String> modify(
//            @PathVariable(name = "sno") Long sno,
//            @RequestBody ScoreDTO scoreDTO) {
//        scoreDTO.setSno(sno);
//        log.info("Modify: " + scoreDTO);
//        scoreService.modify(scoreDTO);
//        return Map.of("RESULT", "성공");
//    }

    // GET
    @GetMapping("/list")
    public List<ResidenceDTO> get() {
        return residenceService.get();
    }

//    // DELETE
//    @DeleteMapping("/delete")
//    public String removeAll (List<Long> tnos){
//        service.removeAll(tnos);
//        return "DELETE SUCCESS";
//    }
}
