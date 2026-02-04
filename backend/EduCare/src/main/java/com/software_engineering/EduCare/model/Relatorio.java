package com.software_engineering.EduCare.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Relatorio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String tipo;
    @Lob
    private String conteudo;
    private LocalDateTime dataGeracao;

    @ManyToOne
    @JoinColumn(name = "escola_id")
    private Escola escola;

    @ManyToOne
    @JoinColumn(name = "orgao_de_saude_id")
    private OrgaoDeSaude orgaoDeSaude;
}
