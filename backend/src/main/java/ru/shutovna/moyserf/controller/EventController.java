package ru.shutovna.moyserf.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.shutovna.moyserf.payload.response.NotificationResponse;
import ru.shutovna.moyserf.service.NotificationEventPublisher;
import ru.shutovna.moyserf.util.NotificationEvent;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@Slf4j
public class EventController {
    @Autowired
    private NotificationEventPublisher eventPublisher;

    @GetMapping("/first")
    public ResponseEntity<?> getFirstNotification() {
        List<NotificationEvent> recentEvents = eventPublisher.getRecentEvents();
        return recentEvents.isEmpty() ?
                ResponseEntity.ok().body(new HashMap<>()):
                ResponseEntity.ok(NotificationResponse.create(recentEvents.get(0)));
    }

    @GetMapping("/recent")
    public List<NotificationResponse> getRecentNotifications() {
        List<NotificationEvent> recentEvents = eventPublisher.getRecentEvents();
        return recentEvents.stream().map(NotificationResponse::create).toList();
    }
}
