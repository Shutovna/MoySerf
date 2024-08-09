package ru.shutovna.moyserf.spring;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling
@ComponentScan({"ru.shutovna.moyserf.task"})
public class SpringTaskConfig {

}
