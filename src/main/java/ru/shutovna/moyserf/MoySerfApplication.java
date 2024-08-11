package ru.shutovna.moyserf;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import ru.shutovna.moyserf.config.AppProperties;
import ru.shutovna.moyserf.error.MailSendException;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
@Service
public class MoySerfApplication {

    public static void main(String[] args) {
        SpringApplication.run(MoySerfApplication.class, args);
    }


}
