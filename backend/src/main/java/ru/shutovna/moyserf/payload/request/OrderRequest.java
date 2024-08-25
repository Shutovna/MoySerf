package ru.shutovna.moyserf.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    private long siteId;
    @Min(100)
    private int viewCount;
}
