package com.software_engineering.EduCare.service;

import com.software_engineering.EduCare.dto.LoginRequest;
import com.software_engineering.EduCare.dto.LoginResponse;
import com.software_engineering.EduCare.dto.RegisterRequest;
import com.software_engineering.EduCare.dto.UserDTO;
import com.software_engineering.EduCare.model.*;
import com.software_engineering.EduCare.repository.PasswordResetTokenRepository;
import com.software_engineering.EduCare.repository.UsuarioRepository;
import com.software_engineering.EduCare.repository.ResponsavelRepository;
import com.software_engineering.EduCare.repository.FuncionarioRepository;
import com.software_engineering.EduCare.util.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UsuarioRepository usuarioRepository;
    private final ResponsavelRepository responsavelRepository;
    private final FuncionarioRepository funcionarioRepository;
    private final PasswordResetTokenRepository resetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    public LoginResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        
        if (!passwordEncoder.matches(request.getPassword(), usuario.getSenha())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getId());
        UserDTO userDTO = UserDTO.fromUser(usuario);
        
        return new LoginResponse(token, userDTO);
    }
    
    public UserDTO register(RegisterRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Determine effective login (default to email if not provided)
        String login = request.getLogin();
        if (login == null || login.trim().isEmpty()) {
            login = request.getEmail();
        }

        if (usuarioRepository.existsByLogin(login)) {
            throw new RuntimeException("Login already registered");
        }
        
        Usuario usuario;
        String type = request.getUserType().toUpperCase();
        
        if ("RESPONSAVEL".equals(type)) {
            usuario = new Responsavel();
        } else if ("ESCOLA".equals(type) || "GESTOR".equals(type) || "PROFESSOR".equals(type)) {
            usuario = "PROFESSOR".equals(type) ? new Professor() : new GestorEscolar();
        } else if ("MEDICO".equals(type)) {
            usuario = new Usuario();
        } else {
            usuario = new Usuario();
        }
        
        usuario.setNome(request.getName());
        usuario.setEmail(request.getEmail());
        usuario.setLogin(login);
        usuario.setSenha(passwordEncoder.encode(request.getPassword()));
        usuario.setCpf(request.getCpf());
        usuario.setContato(request.getContato());
        usuario.setDataNascimento(request.getDataNascimento());
        usuario.setEstadoVinculo(EstadoVinculo.ATIVO);
        
        Usuario savedUser = usuarioRepository.save(usuario);
        return UserDTO.fromUser(savedUser);
    }
    
    public UserDTO getUserById(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserDTO.fromUser(usuario);
    }
    
    public UserDTO getUserByEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserDTO.fromUser(usuario);
    }
    
    @Transactional
    public String createPasswordResetToken(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Deletar tokens antigos do usuário
        resetTokenRepository.deleteByUser(usuario);
        
        // Criar novo token
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(usuario);
        
        resetTokenRepository.save(resetToken);
        
        return token;
    }
    
    public boolean validatePasswordResetToken(String token) {
        return resetTokenRepository.findByToken(token)
                .map(resetToken -> !resetToken.isExpired() && !resetToken.isUsed())
                .orElse(false);
    }
    
    @Transactional
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = resetTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));
        
        if (resetToken.isExpired()) {
            throw new RuntimeException("Token expired");
        }
        
        if (resetToken.isUsed()) {
            throw new RuntimeException("Token already used");
        }
        
        Usuario usuario = resetToken.getUser();
        usuario.setSenha(passwordEncoder.encode(newPassword));
        usuarioRepository.save(usuario);
        
        // Marcar token como usado
        resetToken.setUsed(true);
        resetTokenRepository.save(resetToken);
    }
}
