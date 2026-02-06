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
public class Alerta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String tipo; // sintoma, campanha, surto
    private String descricao;
    private LocalDateTime dataHora;

    // Destinatario: Responsavel OR Escola
    @ManyToOne
    @JoinColumn(name = "responsavel_id")
    private Responsavel responsavel;

    @ManyToOne
    @JoinColumn(name = "escola_id")
    private Escola escola;
}
