package com.software_engineering.EduCare.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDate;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CampanhaVacina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private String local;

    @ManyToOne
    @JoinColumn(name = "orgao_de_saude_id")
    private OrgaoDeSaude orgaoDeSaude;
}
