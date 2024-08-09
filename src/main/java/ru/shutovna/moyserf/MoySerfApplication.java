package ru.shutovna.moyserf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import ru.shutovna.moyserf.config.AppProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class MoySerfApplication {

    public static void main(String[] args) {
        SpringApplication.run(MoySerfApplication.class, args);
    }
}
