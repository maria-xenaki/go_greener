package com.goGreener.eventapp.dine;

import com.goGreener.eventapp.user.User;
import com.goGreener.eventapp.tag.Tag;
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "dine_table")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Dine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    private String city;

    private String link;

    private String address;

    @Column(nullable = false)
    private boolean approved = false;

    @ManyToOne
    @JoinColumn(name = "created_by_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"password", "events"})
    private User createdBy;

    @ManyToMany
    @JoinTable(
            name = "dine_tags_table",
            joinColumns = @JoinColumn(name = "dine_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags = new ArrayList<>();
}
