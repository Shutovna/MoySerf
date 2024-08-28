package ru.shutovna.moyserf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.shutovna.moyserf.model.Transaction;
import ru.shutovna.moyserf.payload.response.TransactionResponse;
import ru.shutovna.moyserf.service.ITransactionService;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    @Autowired
    private ITransactionService transactionService;

    @GetMapping("/my")
    public List<TransactionResponse> getMyTransactions() {
        List<Transaction> myTransactions = transactionService.getMyTransactions();
        return myTransactions.stream().map(TransactionResponse::fromTransaction).toList();
    }

}
