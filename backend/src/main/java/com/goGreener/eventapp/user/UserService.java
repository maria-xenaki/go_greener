package com.goGreener.eventapp.user;

import java.util.Optional;
import java.util.List;

public  interface UserService {
    User saveUser(User user);
    Optional<User> findByUsername(String username);
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    Optional<User> toggleUserEnabled(Long id);
}
