package ru.shutovna.moyserf.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfoResponse {
    private String email;
    private String name;
    private String imageUrl;
}
