package com.goGreener.eventapp.user;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.time.LocalDateTime;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users_table")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;
    private String role; // "USER" ή "ADMIN"

    @Column(nullable = false)
    private boolean enabled = true; //for USER soft delete by ADMIN

    @Column(name = "email_verif_token")
    private String emailVerifToken;

    @Column(name = "email_verif_token_expires")
    private LocalDateTime emailVerifTokenExpires;

    @Column(name = "email_verified")
    private boolean emailVerified;

    @Column(name = "passw_reset_token")
    private String passw_reset_token;

    @Column(name = "passw_reset_token_expires")
    private LocalDateTime passw_reset_token_expires;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
}
