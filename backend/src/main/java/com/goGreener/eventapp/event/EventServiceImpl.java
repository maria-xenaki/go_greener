package com.goGreener.eventapp.service;

import com.goGreener.eventapp.model.Event;
import com.goGreener.eventapp.repository.EventRepository;
import com.zaxxer.hikari.SQLExceptionOverride;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    @Autowired
    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public Event createEvent(Event event) {
        event.setApproved(false);
        return  eventRepository.save(event);
    }
    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }
    @Override
    public Event approveEvent(Long id) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        if (optionalEvent.isPresent()){
            Event event = optionalEvent.get();
            event.setApproved(true);
            return  eventRepository.save(event);
        } else {
            throw new RuntimeException("Event not found with id: " + id);
        }
    }
    @Override
    public List<Event> getUnapprovedEvents() {
        return eventRepository.findByApprovedFalse();
    }

    @Override
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
