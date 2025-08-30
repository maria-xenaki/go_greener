package com.goGreener.eventapp.dine;

import com.goGreener.eventapp.dine.Dine;
import com.goGreener.eventapp.tag.Tag;
import com.goGreener.eventapp.tag.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DineService {

    private final DineRepository dineRepository;
    private final TagRepository tagRepository;

    // Create a new Dine entry
    public Dine createDine(Dine dine) {
        // If tags come in with just names, fetch or create tags
        List<Tag> resolvedTags = new ArrayList<>();

        if (dine.getTags() != null) {
            for (Tag tag : dine.getTags()) {
                String name = tag.getName().trim();

                Tag resolved = tagRepository.findByName(name)
                        .orElseGet(() -> tagRepository.save(new Tag(null, name)));

                resolvedTags.add(resolved);
            }
        }
        dine.setTags(resolvedTags);
        dine.setApproved(false);

        return dineRepository.save(dine);
    }

    // Get all Dine entries
    public List<Dine> getAllDine() {
        return dineRepository.findAll();
    }

    // Get only unapproved Dine entries
    public List<Dine> getUnapprovedDine() {
        return dineRepository.findByApprovedFalse();
    }

    // Get only approved Dine entries
    public List<Dine> getApprovedDine() {
        return dineRepository.findByApprovedTrue();
    }

    // Approve a Dine entry
    public Dine approveDine(Long id) {
        Dine d = dineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dine not found with id " + id));
        d.setApproved(true);
        return dineRepository.save(d);
    }

    // Delete a Dine entry
    public void deleteDine(Long id) {
        dineRepository.deleteById(id);
    }

    // Update a Dine entry
    public Dine updateDine(Long id, Dine updated) {
        Dine d = dineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dining entry not found"));
        d.setTitle(updated.getTitle());
        d.setDescription(updated.getDescription());
        d.setCity(updated.getCity());
        d.setLink(updated.getLink());
        d.setAddress(updated.getAddress());
        //s.setTags(updated.getTags());

        // Handle tags properly
        List<Tag> resolvedTags = new ArrayList<>();
        if (updated.getTags() != null) {
            for (Tag tag : updated.getTags()) {
                String name = tag.getName().trim();
                Tag resolved = tagRepository.findByName(name)
                        .orElseGet(() -> tagRepository.save(new Tag(null, name)));
                resolvedTags.add(resolved);
            }
        }
        d.setTags(resolvedTags);
        return dineRepository.save(d);
    }

    // Optional: get Dine by ID
    public Optional<Dine> getById(Long id) {
        return dineRepository.findById(id);
    }
}