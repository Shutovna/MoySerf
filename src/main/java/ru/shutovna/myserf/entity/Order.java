package ru.shutovna.myserf.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "ORDERS")
@Getter
@Setter
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "view_count", nullable = false)
    private int viewCount;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private boolean closed;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "site_id", nullable = false)
    private Site site;

    @ManyToOne
    @JoinColumn(name = "transaction_id", nullable = false)
    private Transaction transaction;

    @Override
    public String toString() {
        return "Purchase{" +
                "id=" + id +
                ", viewCount=" + viewCount +
                ", createdAt=" + createdAt +
                ", closed=" + closed +
                ", user=" + user.getEmail() +
                ", site=" + site +
                ", transaction=" + transaction.getId() +
                '}';
    }
}
