package ru.shutovna.moyserf.payload;

import lombok.Data;

@Data
public class UserResponse {
    private String name;
    private String email;
    private long earned;
}
