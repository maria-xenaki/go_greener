package com.goGreener.eventapp.event;

import com.goGreener.eventapp.user.User;
import com.goGreener.eventapp.tag.Tag;
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;


@Entity
@Table(name = "events_table")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_free", nullable = false)
    private boolean isFree;

    @Column(nullable = false)
    private double cost;

    @Column(nullable = false)
    private String link;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "start_date")
    private LocalDate startDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(nullable = false)
    private boolean approved = false;

    @ManyToOne
    @JoinColumn(name = "created_by_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"events", "password"})
    private User createdBy;

    @ManyToMany
    @JoinTable(
            name = "event_tags_table",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags = new ArrayList<>();
}