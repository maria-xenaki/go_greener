package com.goGreener.eventapp.repository;

import com.goGreener.eventapp.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventRepository  extends JpaRepository<Event, Long> {
    List<Event> findByApprovedFalse();
}
