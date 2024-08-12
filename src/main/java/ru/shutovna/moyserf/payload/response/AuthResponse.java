package ru.shutovna.moyserf.payload.response;

import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";

    private UserInfoResponse userInfo;

    public AuthResponse(String accessToken, String email, String name, String imageUrl) {
        this.accessToken = accessToken;
        this.userInfo = new UserInfoResponse(email, name, imageUrl);
    }
}
