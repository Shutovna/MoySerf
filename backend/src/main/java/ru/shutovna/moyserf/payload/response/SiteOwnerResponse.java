package ru.shutovna.moyserf.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SiteOwnerResponse {
    private Integer userId;
    private String username;
    private String avatarUrl;
}
