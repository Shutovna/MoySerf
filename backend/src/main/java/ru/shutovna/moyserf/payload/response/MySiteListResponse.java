package ru.shutovna.moyserf.payload.response;

import lombok.Data;

import java.util.List;

@Data
public class MySiteListResponse {
    private List<MySiteResponse> sites;
}
