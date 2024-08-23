package ru.shutovna.moyserf.controller;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ViewToken {
    private LocalDateTime time;
    private String token;
}
