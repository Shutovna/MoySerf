package ru.shutovna.myserf.payload;

import lombok.Data;

@Data
public class LoginDto {
    private String nameOrEmail;
    private String password;
}
