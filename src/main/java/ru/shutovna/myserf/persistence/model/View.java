package ru.shutovna.myserf.persistence.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "VIEWS")
@Getter
@Setter
@NoArgsConstructor
public class View {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "site_id", nullable = false)
    private Site site;

    @Column(name = "viewed_at", nullable = false)
    private LocalDateTime viewedAt;

    @ManyToOne
    @JoinColumn(name = "transaction_id", nullable = false)
    private Transaction transaction;

    @Override
    public String toString() {
        return "View{" +
                "id=" + id +
                ", user=" + user.getEmail() +
                ", site=" + site.getUrl() +
                ", viewedAt=" + viewedAt +
                ", transaction=" + transaction.getId() +
                '}';
    }
}


