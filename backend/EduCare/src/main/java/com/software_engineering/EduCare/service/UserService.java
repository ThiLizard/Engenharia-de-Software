package com.software_engineering.EduCare.service;

import com.software_engineering.EduCare.dto.LoginRequest;
import com.software_engineering.EduCare.dto.LoginResponse;
import com.software_engineering.EduCare.dto.RegisterRequest;
import com.software_engineering.EduCare.dto.UserDTO;
import com.software_engineering.EduCare.model.PasswordResetToken;
import com.software_engineering.EduCare.model.User;
import com.software_engineering.EduCare.repository.PasswordResetTokenRepository;
import com.software_engineering.EduCare.repository.UserRepository;
import com.software_engineering.EduCare.util.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordResetTokenRepository resetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        String token = jwtUtil.generateToken(user.getEmail(), user.getId());
        UserDTO userDTO = UserDTO.fromUser(user);
        
        return new LoginResponse(token, userDTO);
    }
    
    public UserDTO register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setUserType(request.getUserType());
        
        User savedUser = userRepository.save(user);
        return UserDTO.fromUser(savedUser);
    }
    
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserDTO.fromUser(user);
    }
    
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserDTO.fromUser(user);
    }
    
    @Transactional
    public String createPasswordResetToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Deletar tokens antigos do usuário
        resetTokenRepository.deleteByUser(user);
        
        // Criar novo token
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        
        resetTokenRepository.save(resetToken);
        
        // Em produção, aqui você enviaria um email com o link de reset
        // Por enquanto, retornamos o token diretamente
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
        
        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        
        // Marcar token como usado
        resetToken.setUsed(true);
        resetTokenRepository.save(resetToken);
    }
}
