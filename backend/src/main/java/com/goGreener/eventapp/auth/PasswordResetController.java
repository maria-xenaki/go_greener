package com.goGreener.eventapp.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/password")
@RequiredArgsConstructor
public class PasswordResetController {

    private final PasswordResetService resetService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/request")
    public ResponseEntity<String> requestReset(@RequestParam String email) {
        resetService.sendResetEmail(email);
        return ResponseEntity.ok("If this email exists, a reset link has been sent.");
    }

    @PostMapping("/reset")
    public ResponseEntity<String> resetPassword(@RequestParam String token,
                                                @RequestParam String newPassword) {
        boolean success = resetService.resetPassword(token, newPassword, passwordEncoder);
        if (success) return ResponseEntity.ok("Password reset successfully!");
        return ResponseEntity.badRequest().body("Invalid or expired token.");
    }
}
