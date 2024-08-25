package ru.shutovna.moyserf.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyReferalResponse {
    private Integer userId;
    private String name;
    private long earned;
}
