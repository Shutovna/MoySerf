package ru.shutovna.myserf.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "Site")
@Getter
@Setter
@NoArgsConstructor
public class Site {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String name;

    @Column(length = 10000)
    private String description;

    @Column(nullable = false)
    private String url;

    private byte[] avatar;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private Person owner;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Override
    public String toString() {
        return "Site{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", url='" + url + '\'' +
                ", owner=" + owner.getEmail() +
                ", createdAt=" + createdAt +
                '}';
    }
}

