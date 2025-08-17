package com.goGreener.eventapp.emailverification;

import com.goGreener.eventapp.model.User;
import com.goGreener.eventapp.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {

    private final JavaMailSender mailSender;
    private final UserRepository userRepository;

    @Value("${app.frontend.base-url}")
    private String frontendBaseUrl;

    public void sendVerificationEmail(User user) {
        String token = UUID.randomUUID().toString();
        LocalDateTime expiry = LocalDateTime.now().plusDays(1);

        user.setEmailVerifToken(token);
        user.setEmailVerifTokenExpires(expiry);

        userRepository.save(user);

        String link = frontendBaseUrl + "/verify-email?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Verify your email");
        message.setText("Click the link to verify your email: " + link);

        mailSender.send(message);
    }

    @Transactional
    public boolean verifyToken(String token) {
        Optional<User> optionalUser = userRepository.findByEmailVerifToken(token);

        if (optionalUser.isEmpty()) return false;

        User user = optionalUser.get();

        if (user.getEmailVerifTokenExpires().isBefore(LocalDateTime.now())) {
            return false;
        }

        user.setEmailVerified(true);
        user.setEnabled(true);
        user.setEmailVerifToken(null);
        user.setEmailVerifTokenExpires(null);

        userRepository.save(user);

        return true;
    }
}
