package com.goGreener.eventapp.service;

import com.goGreener.eventapp.model.User;

import java.util.Optional;
import java.util.List;

public  interface UserService {
    User saveUser(User user);
    Optional<User> findByUsername(String username);
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    Optional<User> toggleUserEnabled(Long id);
}
