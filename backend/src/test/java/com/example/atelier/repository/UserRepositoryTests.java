package com.example.atelier.repository;

import com.example.atelier.domain.User;
import com.example.atelier.dto.UserDTO;
import com.example.atelier.repository.UserRepository;
import com.example.atelier.service.OrderService;
import com.siot.IamportRestClient.exception.IamportResponseException;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
@Slf4j
public class UserRepositoryTests {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private OrderService orderService;
    @Test
    public void adminTest(){
        List<User> list = userRepository.findAllAdmins();
        log.info("list:{}",list);
    }
    @Test
    public void test() throws IamportResponseException, IOException {
       String result = orderService.testRefund("imp_243474414179");
        System.out.println(result);
    }
}
