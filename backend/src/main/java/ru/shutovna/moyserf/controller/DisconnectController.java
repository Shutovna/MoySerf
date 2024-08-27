package ru.shutovna.moyserf.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class DisconnectController {
    @PostMapping("/userDisconnect")
    public void receiveBeacon() {
        // Обработка полученных данных
        System.out.println("Received beacon data: " );
    }
}
