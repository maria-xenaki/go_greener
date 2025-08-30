package com.goGreener.eventapp.event;

import com.goGreener.eventapp.user.User;
import com.goGreener.eventapp.user.UserRepository;
import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final UserRepository userRepository;

    @PostMapping
    public Event createEvent(@RequestBody Event event) {

        System.out.println(" Incoming event: " + event.getTitle());
        System.out.println(" From: " + event.getStartDate() + " To: " + event.getEndDate());
        System.out.println(" Cost: " + event.getCost());
        System.out.println(" Link: " + event.getLink());
        System.out.println(" Approved? " + event.isApproved());

        // Get current logged-in username
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Fetch User entity from DB
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Set createdBy
        event.setCreatedBy(user);

        event.setApproved(false);
        event.setFree(event.getCost() == 0);

        return eventService.createEvent(event);
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public Optional<Event> getEventById(@PathVariable Long id){
        return eventService.getEventById(id);
    }

    // Get all unapproved events (ADMIN only)
    @GetMapping("/unapproved")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Event> getUnapprovedEvents() {
        return eventService.getUnapprovedEvents();
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public Event approveEvent(@PathVariable Long id){
        return eventService.approveEvent(id);
    }

    // Delete event by ID (ADMIN only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        try {
            Event savedEvent = eventService.updateEvent(id,updatedEvent);
            return ResponseEntity.ok(savedEvent);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //ta teleutaia tou Unified
    @GetMapping("/approved")
    public List<Event> getApprovedEvents() {
        return eventService.findApprovedEvents();
    }
}
