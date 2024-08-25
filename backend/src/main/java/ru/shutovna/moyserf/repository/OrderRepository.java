package ru.shutovna.moyserf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.shutovna.moyserf.model.Order;
import ru.shutovna.moyserf.model.Site;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findAllBySiteAndClosedIsFalseOrderByCreatedAtAsc(Site site);
}
