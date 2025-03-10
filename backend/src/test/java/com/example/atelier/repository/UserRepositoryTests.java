package com.example.atelier.repository;

import com.example.atelier.domain.User;
import com.example.atelier.dto.UserDTO;
import com.example.atelier.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@SpringBootTest
@Slf4j
public class UserRepositoryTests {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;

}
