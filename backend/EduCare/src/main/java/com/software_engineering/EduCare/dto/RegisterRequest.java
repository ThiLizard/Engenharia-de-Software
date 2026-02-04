package com.software_engineering.EduCare.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String email;
    private String password;
    private String name;
    private String login;
    private String cpf;
    private String contato;
    private java.time.LocalDate dataNascimento;
    private String userType; // Changed to String to handle subclass decision in service
}
