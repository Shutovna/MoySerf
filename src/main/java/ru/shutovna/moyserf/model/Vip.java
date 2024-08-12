package ru.shutovna.moyserf.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "vips")
public class Vip {
    @Id
    @GeneratedValue
    private Long id;

    @Enumerated(EnumType.STRING)
    private VipType type;

    @NotNull
    @Column(nullable = false)
    private Instant startedAt;

    private LocalDateTime endedAt;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "transaction_id", nullable = false)
    private Transaction transaction;

}