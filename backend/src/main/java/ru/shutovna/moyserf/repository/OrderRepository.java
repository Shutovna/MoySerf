package ru.shutovna.moyserf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.shutovna.moyserf.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
