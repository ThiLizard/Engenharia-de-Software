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
public class GestorEscolar extends Funcionario {

    // "Mensagem 0..* -- 1 GestorEscolar"
    @OneToMany(mappedBy = "gestor")
    private List<Mensagem> mensagensRecebidas;
}
