package com.software_engineering.EduCare.repository;

import com.software_engineering.EduCare.model.PasswordResetToken;
import com.software_engineering.EduCare.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    void deleteByExpiryDateBefore(LocalDateTime now);
    void deleteByUser(User user);
}
