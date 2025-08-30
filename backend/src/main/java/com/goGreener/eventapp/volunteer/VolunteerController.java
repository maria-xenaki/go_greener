package com.goGreener.eventapp.volunteer;

import com.goGreener.eventapp.user.User;
import com.goGreener.eventapp.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/volunteers")
@RequiredArgsConstructor
public class VolunteerController {

    private final VolunteerService volunteerService;
    private final UserRepository userRepository;

    @PostMapping
    public Volunteer createVolunteer(@RequestBody Volunteer volunteer) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        volunteer.setCreatedBy(user);
        volunteer.setApproved(false);
        return volunteerService.createVolunteer(volunteer);
    }

    @GetMapping
    public List<Volunteer> getAllVolunteers() {
        return volunteerService.getAllVolunteers();
    }

    @GetMapping("/unapproved")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Volunteer> getUnapprovedVolunteers() {
        return volunteerService.getUnapprovedVolunteers();
    }

    @GetMapping("/approved")
    public List<Volunteer> getApprovedVolunteers() {
        return volunteerService.getApprovedVolunteers();
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public Volunteer approveVolunteer(@PathVariable Long id) {
        return volunteerService.approveVolunteer(id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteVolunteer(@PathVariable Long id) {
        volunteerService.deleteVolunteer(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Volunteer updateVolunteer(@PathVariable Long id, @RequestBody Volunteer updatedVolunteer) {
        return volunteerService.updateVolunteer(id, updatedVolunteer);
    }
}
