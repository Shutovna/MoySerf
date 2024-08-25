package ru.shutovna.moyserf.payload.request;
import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class PasswordRequest {

    private String oldPassword;

    private String token;

    @Size(min = 7)
    private String newPassword;
}
