package ru.shutovna.moyserf.payload.request;

import lombok.Data;

@Data
public class OrderRequest {
    private long siteId;
    private int viewCount;
}
