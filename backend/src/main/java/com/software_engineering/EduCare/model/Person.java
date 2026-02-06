package com.software_engineering.EduCare.model;

import lombok.Data;

import java.util.Date;

@Data
public class Person {
    private String firstName;
    private String lastName;
    private String CPF;
    private Date bornDate;
}
