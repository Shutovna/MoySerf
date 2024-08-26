package ru.shutovna.moyserf.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserMessage {
    private String username;
    private String status; // "CONNECTED" или "DISCONNECTED"
}