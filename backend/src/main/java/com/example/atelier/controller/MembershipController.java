package com.example.atelier.controller;

import com.example.atelier.domain.Reservation;
import com.example.atelier.dto.MembershipDTO;
import com.example.atelier.dto.ReservationDTO;
import com.example.atelier.repository.MembershipRepository;
import com.example.atelier.repository.UserRepository;
import com.example.atelier.service.MembershipService;
import com.example.atelier.service.ResidenceService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/atelier/membership")
@Slf4j
public class MembershipController {

    private final MembershipRepository membershipRepository;
    private final   MembershipService membershipService;

    // POST
    @PostMapping("/add")
    public String addData(@RequestBody MembershipDTO membershipDTO){
        System.out.println("controller data : " + membershipDTO);
        return ""+membershipService.register(membershipDTO);
    }

    // GET
    @GetMapping("/{id}")
    public List<MembershipDTO> get(@RequestParam Integer id) {
        return membershipService.get(id);
    }

    // GET ALL(관리자모드)
    @GetMapping("/")
    public List<MembershipDTO> get() {
        return membershipService.getAllMemberships();
    }

    // PUT
    @PutMapping("/modify/{id}")
    public void modify(@PathVariable Integer id, @RequestBody MembershipDTO membershipDTO) {
        membershipDTO.setId(id);
        membershipService.modify(id, membershipDTO);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void remove(@PathVariable Integer id) {
        membershipService.remove(id);
    }

    // 바우처 사용 요청
    @PostMapping("/{id}/use")
    public ResponseEntity<?> useMembership(@PathVariable Integer id) {
        membershipService.useMembership(id);
        return ResponseEntity.ok("멤버십이 정상적으로 사용되었습니다.");
    }
}