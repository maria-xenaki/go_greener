package com.goGreener.eventapp.tag;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.goGreener.eventapp.dine.Dine;
import com.goGreener.eventapp.event.Event;
import com.goGreener.eventapp.shop.Shop;
import com.goGreener.eventapp.volunteer.Volunteer;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "tags_table")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "tags")
    @JsonIgnore
    private List<Event> events = new ArrayList<>();

    @ManyToMany(mappedBy = "tags")
    @JsonIgnore
    private List<Volunteer> volunteers = new ArrayList<>();

    @ManyToMany(mappedBy = "tags")
    @JsonIgnore
    private List<Dine> dines = new ArrayList<>();

    @ManyToMany(mappedBy = "tags")
    @JsonIgnore
    private List<Shop> shops = new ArrayList<>();

    public Tag(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
