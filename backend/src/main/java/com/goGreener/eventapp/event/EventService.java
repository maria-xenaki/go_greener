package com.goGreener.eventapp.service;

import com.goGreener.eventapp.model.Event;

import java.util.List;
import java.util.Optional;

public interface EventService {
    Event createEvent(Event event);
    Optional<Event> getEventById(Long id);
    List<Event> getAllEvents();
    List<Event> getUnapprovedEvents();
    void deleteEvent(Long id);
    Event approveEvent(Long id);
}
