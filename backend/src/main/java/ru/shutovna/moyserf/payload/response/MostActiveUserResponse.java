package ru.shutovna.moyserf.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import ru.shutovna.moyserf.model.User;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class MostActiveUserResponse {
    private String name;
    private String email;
    private BigDecimal earned;

    public static MostActiveUserResponse fromUser(User user, BigDecimal earned) {
        return new MostActiveUserResponse(user.getName(), user.getEmail(), earned);
    }
}
