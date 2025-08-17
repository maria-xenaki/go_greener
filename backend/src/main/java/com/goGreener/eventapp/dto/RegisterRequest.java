package com.goGreener.eventapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    public String username;
    public String email;
    public String password;
}
