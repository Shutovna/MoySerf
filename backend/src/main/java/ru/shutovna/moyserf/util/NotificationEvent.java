package ru.shutovna.moyserf.util;

import lombok.Data;
import org.springframework.context.ApplicationEvent;
import ru.shutovna.moyserf.model.User;

import java.time.Clock;

@Data
public class NotificationEvent extends ApplicationEvent {
    private User user;
    private String message;

    public NotificationEvent(Object source, User user, String message) {
        super(source);
        this.user = user;
        this.message = message;
    }

    public NotificationEvent(Object source, Clock clock) {
        super(source, clock);
    }
}
