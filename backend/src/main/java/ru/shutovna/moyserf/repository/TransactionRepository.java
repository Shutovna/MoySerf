package ru.shutovna.moyserf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.shutovna.moyserf.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
