package ru.shutovna.moyserf.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import ru.shutovna.moyserf.model.User;

@Data
@AllArgsConstructor
public class MostActiveUserResponse {
    private String name;
    private String email;
    private long earned;

    public static MostActiveUserResponse fromUser(User user) {
        return new MostActiveUserResponse(user.getName(), user.getEmail(), 0);
    }
}
