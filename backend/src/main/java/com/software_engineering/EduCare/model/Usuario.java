package com.software_engineering.EduCare.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Usuario extends Pessoa {

    private String statusAutenticacao; // e.g., "LOGGED_IN", "LOGGED_OUT"

    @Column(nullable = false, unique = true)
    private String login;

    @Column(nullable = false)
    private String senha;

    @Enumerated(EnumType.STRING)
    private EstadoVinculo estadoVinculo;

    private String contato;

    @Column(nullable = false, unique = true)
    private String email;

    // Methods like authenticar(), atualizarCadastro() would be in Service logic typically,
    // but can be added here if domain logic applies. JPA entities are usually data holders.
}
