package com.software_engineering.EduCare.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comorbidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;
    private String recomendacao;

    @ManyToOne
    @JoinColumn(name = "aluno_id")
    private Aluno aluno;
}
