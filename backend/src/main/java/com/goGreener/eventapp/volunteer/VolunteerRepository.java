package com.goGreener.eventapp.volunteer;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {
    List<Volunteer> findByApprovedFalse();
    List<Volunteer> findByApprovedTrue();
}
