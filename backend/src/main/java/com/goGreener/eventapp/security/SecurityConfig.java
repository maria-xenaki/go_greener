package com.goGreener.eventapp.security;

import com.goGreener.eventapp.user.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        JwtAuthFilter jwtAuthFilter = new JwtAuthFilter(jwtService, userDetailsService);

        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // React app + static assets
                        .requestMatchers(
                                "/", "/index.html", "/favicon.ico", "/manifest.json", "/static/**",
                                "/*.png", "/*.jpg", "/*.json"
                        ).permitAll()

                        // public backend endpoints
                        .requestMatchers("/test", "/ping", "/auth/**", "/api/email-verification/**").permitAll()
                        .requestMatchers(HttpMethod.GET,
                                "/api/events/**",
                                "/api/events/approved",
                                "/api/volunteers/approved",
                                "/api/shops/approved",
                                "/api/dine/approved"
                        ).permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/contact").permitAll()

                        // POST authenticated
                        .requestMatchers(HttpMethod.POST,
                                "/api/events",
                                "/api/volunteers",
                                "/api/shops",
                                "/api/dine"
                        ).hasAnyRole("USER", "ADMIN")

                        // PUT (ADMIN only)
                        .requestMatchers(HttpMethod.PUT,
                                "/api/events/**",
                                "/api/volunteers/**",
                                "/api/shops/**",
                                "/api/dine/**",
                                "/users/**"
                        ).hasRole("ADMIN")

                        // DELETE (ADMIN only)
                        .requestMatchers(HttpMethod.DELETE,
                                "/api/events/**",
                                "/api/volunteers/**",
                                "/api/shops/**",
                                "/api/dine/**"
                        ).hasRole("ADMIN")

                        // any other request requires auth
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
