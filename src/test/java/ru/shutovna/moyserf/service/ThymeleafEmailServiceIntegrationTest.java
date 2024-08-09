package ru.shutovna.moyserf.service;

import jakarta.mail.MessagingException;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;
import ru.shutovna.moyserf.MoySerfApplication;
import ru.shutovna.moyserf.spring.TestDbConfig;
import ru.shutovna.moyserf.spring.TestIntegrationConfig;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@AutoConfigureMockMvc
@Transactional
@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = { MoySerfApplication.class, TestDbConfig.class, TestIntegrationConfig.class }, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ThymeleafEmailServiceIntegrationTest {
    @Autowired
    private ThymeleafEmailService emailService;

    @Autowired
    private IUserService userService;

    @Autowired
    private JavaMailSender javaMailSender;

    @Test
    public void testSendConfirmationEmail() throws MessagingException {
        assertNotNull(userService);
        String to = "ShutovNA1987@gmail.com";
        String confirmationLink = "http://example.com/confirm";
        emailService.sendConfirmationEmail(to, confirmationLink);
        assertTrue(true);
    }

    @Test
    public void testSendResetPasswordEmail() throws MessagingException {
        String to = "ShutovNA1987@gmail.com";
        String resetLink = "http://example.com/reset";
        emailService.sendResetPasswordEmail(to, resetLink);
        assertTrue(true);
    }
}
