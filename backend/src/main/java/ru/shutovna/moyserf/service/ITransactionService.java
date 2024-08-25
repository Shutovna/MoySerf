package ru.shutovna.moyserf.service;

import ru.shutovna.moyserf.model.Transaction;
import ru.shutovna.moyserf.model.TransactionType;
import ru.shutovna.moyserf.model.User;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ITransactionService {
    List<Transaction> getTransactions();

    Optional<Transaction> getTransaction(int id);

    Transaction createTransaction(TransactionType type, String description, long sum, User user);
}
