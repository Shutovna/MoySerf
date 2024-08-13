package ru.shutovna.moyserf.util;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import ru.shutovna.moyserf.config.AppProperties;

@Component
public class ProfileLogger {

    private final Environment environment;
    private final AppProperties appProperties;


    public ProfileLogger(Environment environment, AppProperties appProperties) {
        this.environment = environment;
        this.appProperties = appProperties;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void logActiveProfiles() {
        String[] activeProfiles = environment.getActiveProfiles();
        System.out.println("Active Profiles: " + String.join(", ", activeProfiles));
        System.out.println("Frontend port: " + appProperties.getFrontend().getPort());

    }
}
