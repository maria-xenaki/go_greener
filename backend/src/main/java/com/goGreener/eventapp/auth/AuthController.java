package com.goGreener.eventapp.auth;

import com.goGreener.eventapp.dto.ErrorResponse;
import com.goGreener.eventapp.dto.RegisterRequest;
import com.goGreener.eventapp.emailverification.EmailVerificationService;
import com.goGreener.eventapp.user.User;
import com.goGreener.eventapp.user.UserRepository;
import com.goGreener.eventapp.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailVerificationService emailVerificationService;

    // DTO for login
    public static class LoginRequest {
        public String username;
        public String password;
    }

    // DTO for login response
    public static class AuthResponse {
        public String token;

        public AuthResponse(String token) {
            this.token = token;
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");
        user.setEnabled(false);

        userRepository.save(user);

        emailVerificationService.sendVerificationEmail(user);

        return ResponseEntity.ok("Registration successful. Please verify your email.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User existing = userRepository.findByUsername(loginRequest.username)
                .orElse(null);

        if (existing == null) {
            return ResponseEntity.status(401).body(new ErrorResponse("Username not found."));
        }

        if (!passwordEncoder.matches(loginRequest.password, existing.getPassword())) {
            return ResponseEntity.status(401).body(new ErrorResponse("Wrong password."));
        }

        if (!existing.isEnabled()) {
            return ResponseEntity.status(403).body(new ErrorResponse("Account not verified. Please check your email."));
        }

        String token = jwtService.generateToken(existing);
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
