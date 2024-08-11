package ru.shutovna.moyserf.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {
    private String email;
    private String username;
    private String accessToken;
    private String tokenType = "Bearer";

    public AuthResponse(String accessToken, String email, String username) {
        this.accessToken = accessToken;
        this.email = email;
        this.username = username;
    }
}
