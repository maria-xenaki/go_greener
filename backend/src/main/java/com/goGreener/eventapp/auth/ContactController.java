package com.goGreener.eventapp.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ContactController {
    private final JavaMailSender mailSender;

    @Value("${app.contact.to}")
    private String contactEmail;

    public static class ContactRequest {
        public String name;
        public String email;
        public String subject;
        public String message;
    }
    @PostMapping("/contact")
    public ResponseEntity<String> sendContact(@RequestBody ContactRequest request) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(contactEmail);
            mailMessage.setSubject("Contact Form: " + request.subject);
            mailMessage.setText(
                            "Name: " + request.name + "\n" +
                            "Email: " + request.email + "\n\n" +
                            "Subject: " + request.subject + "\n\n" +
                            "Message: " + request.message
            );

            mailSender.send(mailMessage);

            return ResponseEntity.ok("Message sent successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to send message.");
        }
    }

}



