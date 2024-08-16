package ru.shutovna.moyserf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.shutovna.moyserf.model.View;

public interface ViewRepository extends JpaRepository<View, Long> {
}
