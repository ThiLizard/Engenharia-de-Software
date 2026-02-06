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
public class Mensagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String contatoResponsavel;
    private String contatoGestor;
    private String texto;
    private String remetente;
    private String destinatario;
    private LocalDateTime dataHora;

    @ManyToOne
    @JoinColumn(name = "responsavel_id")
    private Responsavel responsavel;

    @ManyToOne
    @JoinColumn(name = "gestor_id")
    private GestorEscolar gestor;
}
