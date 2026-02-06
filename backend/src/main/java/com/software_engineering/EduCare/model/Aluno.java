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
public class Aluno extends Pessoa {

    @Column(nullable = false, unique = true)
    private String matricula;

    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comorbidade> comorbidades;
    
    // Relationship with Turma (Assuming ManyToMany based on description "Aluno 1 -- 0..* Turma")
    // If Aluno belongs to only one Turma, it would be ManyToOne.
    // The diagram says "Aluno 1 -- 0..* Turma" which is ambiguous without arrows,
    // but often means "One Aluno has Many Turmas".
    @ManyToMany
    @JoinTable(
        name = "aluno_turma",
        joinColumns = @JoinColumn(name = "aluno_id"),
        inverseJoinColumns = @JoinColumn(name = "turma_id")
    )
    private List<Turma> turmas;

    // Relationship with Sintoma (Aluno 1 -- 0..* Sintoma)
    @OneToMany(mappedBy = "aluno")
    private List<Sintoma> sintomas;
}
