package ru.shutovna.moyserf.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import ru.shutovna.moyserf.model.User;

@Data
@AllArgsConstructor
public class UserResponse {
    private String name;
    private String email;
    private long earned;

    public static UserResponse fromUser(User user) {
        return new UserResponse(user.getName(), user.getEmail(), 0);
    }
}
