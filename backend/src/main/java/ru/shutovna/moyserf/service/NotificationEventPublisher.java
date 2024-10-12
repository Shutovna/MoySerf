package ru.shutovna.moyserf.service;

import lombok.Getter;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationEventPublisherAware;
import org.springframework.stereotype.Component;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.util.Constants;
import ru.shutovna.moyserf.util.NotificationEvent;

import java.util.ArrayList;
import java.util.List;

@Component
public class NotificationEventPublisher implements ApplicationEventPublisherAware {

    private ApplicationEventPublisher applicationEventPublisher;

    @Getter
    private final List<NotificationEvent> recentEvents = new ArrayList<>();

    @Override
    public void setApplicationEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
        this.applicationEventPublisher = applicationEventPublisher;
    }

    public void publishEvent(final User user, final String message) {
        System.out.println("Publishing custom event. ");
        NotificationEvent notificationEvent = new NotificationEvent(this, user, message);
        applicationEventPublisher.publishEvent(notificationEvent);
        addRecentEvent(notificationEvent);
    }

    private void addRecentEvent(final NotificationEvent event) {
        if(recentEvents.size() >= Constants.MAX_EVENT_COUNT) {
            recentEvents.remove(recentEvents.size() - 1);
        }
        recentEvents.add(0, event);
    }

}