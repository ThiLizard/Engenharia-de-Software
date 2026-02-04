package com.software_engineering.EduCare.dto;
import com.software_engineering.EduCare.model.Usuario;
import com.software_engineering.EduCare.model.Responsavel;
import com.software_engineering.EduCare.model.Funcionario;
import com.software_engineering.EduCare.model.GestorEscolar;
import com.software_engineering.EduCare.model.Professor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String email;
    private String name;
    private String login;
    private String cpf;
    private String contato;
    private LocalDate dataNascimento;
    private String userType;
    
    public static UserDTO fromUser(Usuario usuario) {
        String type = "USUARIO";
        if (usuario instanceof Responsavel) {
            type = "RESPONSAVEL";
        } else if (usuario instanceof GestorEscolar || usuario instanceof Professor || usuario instanceof Funcionario) {
            // Frontend uses 'ESCOLA' for school-related staff
            type = "ESCOLA";
        }
        
        return new UserDTO(
            usuario.getId(),
            usuario.getEmail(),
            usuario.getNome(),
            usuario.getLogin(),
            usuario.getCpf(),
            usuario.getContato(),
            usuario.getDataNascimento(),
            type
        );
    }
}
