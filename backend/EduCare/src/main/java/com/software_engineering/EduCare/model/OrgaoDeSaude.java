package com.software_engineering.EduCare.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.util.List;
import java.util.Map;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrgaoDeSaude {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cnpj;
    private String endereco;
    private String contato;
    private String statusAtivacao;

    // MonitoramentoEpidemiologico: Map<Escola, SituacaoSaudeTurma>
    // Mapping a Map<Entity, String> or similar.
    // For simplicity, using ElementCollection or OneToMany.
    // JPA Map with Entity key is complex.
    // Ignoring complex map for now, assuming simple relation or will implement later if critical.
    
    @OneToMany(mappedBy = "orgaoDeSaude")
    private List<CampanhaVacina> campanhas;

    @OneToMany(mappedBy = "orgaoDeSaude")
    private List<Relatorio> relatorios;
}
