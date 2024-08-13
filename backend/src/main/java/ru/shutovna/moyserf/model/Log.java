package ru.shutovna.moyserf.model;

import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "log_messages")
@Getter
@Setter
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    private String thread;

    @Column(length = 200000)
    private String message;

    @Override
    public String toString() {
        return "Log{" +
                "id=" + id +
                ", createdAt=" + createdAt +
                ", thread='" + thread + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
