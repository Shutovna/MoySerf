package ru.shutovna.moyserf.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserOnlineController {

    private int userCount = 0;

    @MessageMapping("/userConnected")
    @SendTo("/topic/usersOnline")
    public int userConnected() {
        userCount++;
        return userCount;
    }

    @MessageMapping("/userDisconnected")
    @SendTo("/topic/usersOnline")
    public int userDisconnected() {
        userCount--;
        return userCount;
    }
}