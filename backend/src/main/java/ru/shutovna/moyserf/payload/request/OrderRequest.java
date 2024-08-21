package ru.shutovna.moyserf.payload.request;

import lombok.Data;

import javax.validation.constraints.Min;

@Data
public class OrderRequest {
    private long siteId;
    @Min(100)
    private int viewCount;
}
