package ru.shutovna.moyserf.controller;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import ru.shutovna.moyserf.payload.response.NotificationResponse;
import ru.shutovna.moyserf.payload.response.UserInfoResponse;
import ru.shutovna.moyserf.util.NotificationEvent;

@Controller
public class NotificationController {

    private final SimpMessagingTemplate messagingTemplate;

    

    public NotificationController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // Отправка уведомления всем клиентам
    @MessageMapping("/notify")
    @SendTo("/topic/notifications")
    public String sendNotification(String message) {
        return message; // Отправляем сообщение всем подписчикам
    }

    // Метод для отправки уведомлений определенному пользователю
    @EventListener
    public void sendNotification(NotificationEvent notificationEvent) {
        messagingTemplate.convertAndSend("/topic/notifications", NotificationResponse.create(notificationEvent));
    }

}