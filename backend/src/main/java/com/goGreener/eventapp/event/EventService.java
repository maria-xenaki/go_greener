package com.goGreener.eventapp.event;

import java.util.List;
import java.util.Optional;

public interface EventService {
    Event createEvent(Event event);
    Optional<Event> getEventById(Long id);
    List<Event> getAllEvents();
    List<Event> getUnapprovedEvents();
    void deleteEvent(Long id);
    Event approveEvent(Long id);
    Event updateEvent(Long id, Event updatedEvent);

    //ta teleutaia tou unified
    //List<Event> findByApprovedTrue();

    List<Event> findApprovedEvents();

}
