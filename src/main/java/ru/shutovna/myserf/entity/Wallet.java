package ru.shutovna.myserf.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "WALLETS")
@Getter
@Setter
@NoArgsConstructor
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(nullable = false)
    private long sum;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Override
    public String toString() {
        return "Wallet{" +
                "id=" + id +
                ", sum=" + sum +
                ", user=" + user.getEmail() +
                '}';
    }
}

