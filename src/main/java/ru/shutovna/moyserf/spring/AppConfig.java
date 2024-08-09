package ru.shutovna.moyserf.spring;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.shutovna.moyserf.security.ActiveUserStore;

@Configuration
public class AppConfig {
    // beans

    @Bean
        public ActiveUserStore activeUserStore() {
        return new ActiveUserStore();
    }

}