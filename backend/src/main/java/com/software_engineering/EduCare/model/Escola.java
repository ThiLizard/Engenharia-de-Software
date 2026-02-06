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
public class Escola {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String cnpj;

    private String endereco;
    private String contato;

    @OneToMany(mappedBy = "escola")
    private List<Funcionario> funcionarios;

    // Based on diagram "Turma 1..* -- 1..* Escola" or "Turma 1..* -- 1 Escola"
    // Usually a Turma belongs to one Escola.
    @OneToMany
    private List<Turma> turmas; // Assuming OneToMany for simplicity if not specified otherwise
    
    // "Escola 1 -- 1..* Pagamento"
    @OneToMany(mappedBy = "escola")
    private List<Pagamento> pagamentos;

    // "Escola 1 -- 0..* Relatorio"
    // "Escola 1 -- 1..* OrgaoDeSaude" -> This looks like ManyToMany or simple relation.
    // "Escola 1 -- 0..* Alerta"
}
