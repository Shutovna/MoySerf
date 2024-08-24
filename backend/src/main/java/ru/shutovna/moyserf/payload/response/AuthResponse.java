package ru.shutovna.moyserf.payload.response;

import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import lombok.Getter;
import lombok.Setter;
import ru.shutovna.moyserf.model.User;

@Getter
@Setter
public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";

    private UserInfoResponse userInfo;

    public AuthResponse(String accessToken, User user) {
        this.accessToken = accessToken;
        this.userInfo = UserInfoResponse.from(user);
    }
}
