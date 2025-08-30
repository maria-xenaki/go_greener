package com.goGreener.eventapp.volunteer;

import com.goGreener.eventapp.volunteer.Volunteer;
import com.goGreener.eventapp.tag.Tag;
import com.goGreener.eventapp.tag.TagRepository;
import lombok.RequiredArgsConstructor;
import java.util.Optional;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class VolunteerService {

    private final VolunteerRepository volunteerRepository;
    private final TagRepository tagRepository;

    public Volunteer createVolunteer(Volunteer volunteer) {
        // If tags come in with just names, fetch or create tags
        List<Tag> resolvedTags = new ArrayList<>();

        if (volunteer.getTags() != null) {
            for (Tag tag : volunteer.getTags()) {
                String name = tag.getName().trim();

                Tag resolved = tagRepository.findByName(name)
                        .orElseGet(() -> tagRepository.save(new Tag(null, name)));

                resolvedTags.add(resolved);
            }
        }
        volunteer.setTags(resolvedTags);
        volunteer.setApproved(false);

        return volunteerRepository.save(volunteer);
    }

    public List<Volunteer> getAllVolunteers() {
        return volunteerRepository.findAll();
    }

    public List<Volunteer> getUnapprovedVolunteers() {
        return volunteerRepository.findByApprovedFalse();
    }

    public List<Volunteer> getApprovedVolunteers() {
        return volunteerRepository.findByApprovedTrue();
    }

    public Volunteer approveVolunteer(Long id) {
        Volunteer v = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));
        v.setApproved(true);
        return volunteerRepository.save(v);
    }

    public void deleteVolunteer(Long id) {
        volunteerRepository.deleteById(id);
    }

    public Volunteer updateVolunteer(Long id, Volunteer updated) {
        Volunteer v = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));
        v.setTitle(updated.getTitle());
        v.setDescription(updated.getDescription());
        v.setLink(updated.getLink());
        v.setCity(updated.getCity());
        v.setAddress(updated.getAddress());

        List<Tag> resolvedTags = new ArrayList<>();
        if (updated.getTags() != null) {
            for (Tag tag : updated.getTags()) {
                String name = tag.getName().trim();
                Tag resolved = tagRepository.findByName(name)
                        .orElseGet(() -> tagRepository.save(new Tag(null, name)));
                resolvedTags.add(resolved);
            }
        }
        v.setTags(resolvedTags);
        return volunteerRepository.save(v);
    }
    public Optional<Volunteer> getById(Long id) {
        return volunteerRepository.findById(id);
    }


}
