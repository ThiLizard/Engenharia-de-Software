package com.software_engineering.EduCare.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String serie;
    private String sala;

    @ManyToOne
    @JoinColumn(name = "professor_id")
    private Professor professor;
    
    // If ManyToMany with Aluno as per Aluno entity
    @ManyToMany(mappedBy = "turmas")
    private List<Aluno> alunos;
}
