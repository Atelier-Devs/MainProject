package com.example.atelier.dto;

import com.example.atelier.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class UserDTO {
    private Integer id;
    private String name;
    private String email;
    private String phone;
    private String role;


}
