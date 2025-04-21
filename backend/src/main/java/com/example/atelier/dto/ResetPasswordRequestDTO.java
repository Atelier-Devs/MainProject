package com.example.atelier.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class ResetPasswordRequestDTO {
    private String email;
    private String tempPassword;
    private String newPassword;
}
