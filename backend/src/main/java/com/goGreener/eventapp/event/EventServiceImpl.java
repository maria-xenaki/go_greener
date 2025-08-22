package com.goGreener.eventapp.event;

import com.goGreener.eventapp.event.Event;
import com.goGreener.eventapp.tag.Tag;
import com.goGreener.eventapp.event.EventRepository;
import com.goGreener.eventapp.tag.TagRepository;
import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final TagRepository tagRepository;

    @Override
    public Event createEvent(Event event) {
        // If tags come in with just names, fetch or create tags
        List<Tag> resolvedTags = new ArrayList<>();

        if (event.getTags() != null) {
            for (Tag tag : event.getTags()) {
                String name = tag.getName().trim();

                Tag resolved = tagRepository.findByName(name)
                        .orElseGet(() -> tagRepository.save(new Tag(null, name)));

                resolvedTags.add(resolved);
            }
        }
        event.setTags(resolvedTags);
        event.setApproved(false);
        event.setFree(event.getCost() ==0);

        return eventRepository.save(event);
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
            throw new RuntimeException("Event not found");
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

    @Override
    public Event updateEvent(Long id, Event updatedEvent) {
        Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        existingEvent.setTitle(updatedEvent.getTitle());
        existingEvent.setDescription(updatedEvent.getDescription());
        existingEvent.setStartDate(updatedEvent.getStartDate());
        existingEvent.setEndDate(updatedEvent.getEndDate());
        existingEvent.setCost(updatedEvent.getCost());
        existingEvent.setLink(updatedEvent.getLink());
        existingEvent.setFree(updatedEvent.getCost() == 0);

        // Handle tags properly
        List<Tag> resolvedTags = new ArrayList<>();
        if (updatedEvent.getTags() != null) {
            for (Tag tag : updatedEvent.getTags()) {
                String name = tag.getName().trim();
                Tag resolved = tagRepository.findByName(name)
                        .orElseGet(() -> tagRepository.save(new Tag(null, name)));
                resolvedTags.add(resolved);
            }
        }
        existingEvent.setTags(resolvedTags);

        // Do NOT reset 'approved' status here
        return eventRepository.save(existingEvent);
    }


}
