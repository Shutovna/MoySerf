package ru.shutovna.moyserf.service;

import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.util.ReflectionTestUtils;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
public class ThymeleafEmailServiceTest {

    @Mock
    private JavaMailSender javaMailSender;

    @Mock
    private TemplateEngine templateEngine;

    @Mock
    private MessageSource messages;

    @InjectMocks
    private ThymeleafEmailService emailService;

    @Value("${support.email}")
    private String supportEmail;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSendConfirmationEmail() throws MessagingException {
        // Arrange
        String recipientEmail = "test@example.com";
        String confirmationLink = "http://example.com/confirm";
        String emailContent = "<html>Confirmation Email</html>";

        MimeMessage mimeMessage = new MimeMessage((Session) null);
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        when(javaMailSender.createMimeMessage()).thenReturn(mimeMessage);
        when(templateEngine.process(eq("emailConfirmationTemplate"), any(Context.class))).thenReturn(emailContent);
        ReflectionTestUtils.setField(emailService, "supportEmail", supportEmail);

        // Act
        emailService.sendConfirmationEmail(recipientEmail, confirmationLink);

        // Assert
        verify(javaMailSender).send(mimeMessage);
        verify(templateEngine).process(eq("emailConfirmationTemplate"), any(Context.class));

        helper.setFrom(supportEmail);
        helper.setTo(recipientEmail);
        helper.setSubject("Подтверждение регистрации");
        helper.setText(emailContent, true);
    }
}
