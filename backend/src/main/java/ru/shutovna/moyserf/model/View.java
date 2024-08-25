package ru.shutovna.moyserf.model;

import javax.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "views")
@Getter
@Setter
@NoArgsConstructor
public class View {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "viewed_at", nullable = false)
    private LocalDateTime viewedAt;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "transaction_id", nullable = false)
    private Transaction transaction;

    @Override
    public String toString() {
        return "View{" +
                "id=" + id +
                ", user=" + user.getEmail() +
                ", order=" + order.getId() +
                ", viewedAt=" + viewedAt +
                ", transaction=" + transaction.getId() +
                '}';
    }
}


