package ru.shutovna.moyserf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.shutovna.moyserf.model.Transaction;
import ru.shutovna.moyserf.payload.response.TransactionResponse;
import ru.shutovna.moyserf.service.ITransactionService;

import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    @Autowired
    private ITransactionService transactionService;

    private final MessageSource messages;

    public TransactionController(MessageSource messages) {
        this.messages = messages;
    }

    @GetMapping("/my")
    public List<TransactionResponse> getMyTransactions() {
        List<Transaction> myTransactions = transactionService.getMyTransactions();
        return myTransactions.stream().map(this::fromTransaction).toList();
    }

    public TransactionResponse fromTransaction(Transaction transaction) {
        TransactionResponse response = new TransactionResponse();
        response.setId(transaction.getId());
        response.setDescription(transaction.getDescription());
        response.setType(getTransactionTypeString(transaction));
        response.setSum(transaction.getSum());
        response.setCreatedDate(transaction.getCreatedAt());
        return response;
    }

    private String getTransactionTypeString(Transaction transaction) {
        Locale currentLocale = LocaleContextHolder.getLocale();
        String typeString;
        switch (transaction.getType()) {
            case MONEY_INPUT ->
                    typeString = messages.getMessage("message.transaction.type.money.input", new Object[]{}, currentLocale);
            case MONEY_OUTPUT ->
                    typeString = messages.getMessage("message.transaction.type.money.output", new Object[]{}, currentLocale);
            case USER_EARNED_SITE_VIEW ->
                    typeString = messages.getMessage("message.transaction.type.user.earned.site.view", new Object[]{}, currentLocale);
            case USER_EARNED_REFERAL_SITE_VIEW ->
                    typeString = messages.getMessage("message.transaction.type.user.referal.site.view", new Object[]{}, currentLocale);
            case SYSTEM_EARENED_SITE_VIEW ->
                    typeString = messages.getMessage("message.transaction.type.system.earned.site.view", new Object[]{}, currentLocale);
            case ORDER_SITE_VIEW ->
                    typeString = messages.getMessage("message.transaction.type.order.site.view", new Object[]{}, currentLocale);
            case VIP_REGISTERED ->
                    typeString = messages.getMessage("message.transaction.type.vip.registered", new Object[]{}, currentLocale);
            default -> throw new IllegalArgumentException("Invalid transaction type: " + transaction.getType());
        }
        return typeString;
    }
}
