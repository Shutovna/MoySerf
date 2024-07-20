package ru.shutovna.myserf.spring;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling
@ComponentScan({ "ru.shutovna.myserf.task" })
public class SpringTaskConfig {

}
