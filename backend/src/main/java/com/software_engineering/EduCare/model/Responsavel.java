package com.software_engineering.EduCare.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Responsavel extends Usuario {

    private int diasSemVinculo;

    // "Responsavel 1 -- 1..* Alerta" - handled in Alerta (ManyToOne) or here (OneToMany)
    
    // "Responsavel 1 -- 0..* Mensagem"
    @OneToMany(mappedBy = "responsavel")
    private List<Mensagem> mensagens; // Need to create Mensagem

    // Dependentes: Not explicitly mapped in Aluno with a field "responsavel",
    // but implies Responsavel has many Alunos.
    // If Aluno doesn't have "responsavel" field in diagram, maybe it's Unidirectional OneToMany?
    // Or ManyToMany if Aluno has multiple Responsavels (Mom+Dad).
    // Assuming OneToMany for now.
    @OneToMany
    @JoinTable(name = "responsavel_aluno")
    private List<Aluno> dependentes;
}
