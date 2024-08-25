package ru.shutovna.moyserf.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.shutovna.moyserf.model.User;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponse {
    private Integer id;
    private String email;
    private String name;
    private String imageUrl;
    private Integer invitorId;

    public static UserInfoResponse from(User user) {
        UserInfoResponse response = new UserInfoResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setName(user.getName());
        response.setImageUrl(user.getImageUrl());
        User invitor = user.getInvitor();
        if(invitor != null) {
            response.setInvitorId(invitor.getId());
        }
        return response;
    }
}
