package com.goGreener.eventapp.dine;

import com.goGreener.eventapp.user.User;
import com.goGreener.eventapp.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/dine")
@RequiredArgsConstructor
public class DineController {

    private final DineService dineService;
    private final UserRepository userRepository;

    // Create a new Dine entry
    @PostMapping
    public Dine createDine(@RequestBody Dine dine) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        dine.setCreatedBy(user);
        dine.setApproved(false);
        return dineService.createDine(dine);
    }

    // Get all Dine entries
    @GetMapping
    public List<Dine> getAllDine() {
        return dineService.getAllDine();
    }

    // Get unapproved Dine entries (Admin only)
    @GetMapping("/unapproved")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Dine> getUnapprovedDine() {
        return dineService.getUnapprovedDine();
    }

    // Get approved Dine entries
    @GetMapping("/approved")
    public List<Dine> getApprovedDine() {
        return dineService.getApprovedDine();
    }

    // Approve a Dine entry (Admin only)
    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public Dine approveDine(@PathVariable Long id) {
        return dineService.approveDine(id);
    }

    // Delete a Dine entry (Admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteDine(@PathVariable Long id) {
        dineService.deleteDine(id);
    }

    // Update a Dine entry (Admin only)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Dine updateDine(@PathVariable Long id, @RequestBody Dine updatedDine) {
        return dineService.updateDine(id, updatedDine);
    }
}