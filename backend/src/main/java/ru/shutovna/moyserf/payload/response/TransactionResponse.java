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
}
