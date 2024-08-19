package ru.shutovna.moyserf.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateSiteRequest {
    private String name;
    private String description;
    private String url;
    private String avatarUrl;
    private int viewCount;
}
