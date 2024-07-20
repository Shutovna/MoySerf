package ru.shutovna.myserf.spring;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan({ "ru.shutovna.myserf.service" })
public class ServiceConfig {
}
