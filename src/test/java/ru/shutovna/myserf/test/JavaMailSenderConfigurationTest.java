package ru.shutovna.myserf.test;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import ru.shutovna.myserf.MySerfApplication;
import ru.shutovna.myserf.spring.TestDbConfig;
import ru.shutovna.myserf.spring.TestIntegrationConfig;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = { MySerfApplication.class, TestDbConfig.class, TestIntegrationConfig.class }, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class JavaMailSenderConfigurationTest {
    @Autowired
    private JavaMailSender mailSender;

    @Test
    public void notifyUser(String email, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("test.sender@hotmail.com");
        message.setSubject("Message from Java Mail Sender");
        message.setText(content);
        message.setTo(email);

        mailSender.send(message);

    }
}
