package ru.shutovna.moyserf.payload.response;

import lombok.Data;
import ru.shutovna.moyserf.model.Transaction;

import java.time.LocalDateTime;

@Data
public class TransactionResponse {
    private int id;
    private String description;
    private String type;
    private long sum;
    private LocalDateTime createdDate;

    public static TransactionResponse fromTransaction(Transaction transaction) {
        TransactionResponse response = new TransactionResponse();
        response.setId(transaction.getId());
        response.setDescription(transaction.getDescription());
        response.setType(transaction.getType().toString());
        response.setSum(transaction.getSum());
        response.setCreatedDate(transaction.getCreatedAt());
        return response;
    }
}
