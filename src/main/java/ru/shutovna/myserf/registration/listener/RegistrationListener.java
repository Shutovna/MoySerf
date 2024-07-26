package ru.shutovna.myserf.registration.listener;

import jakarta.mail.MessagingException;
import lombok.extern.flogger.Flogger;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.MessageSource;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import ru.shutovna.myserf.persistence.model.User;
import ru.shutovna.myserf.registration.OnRegistrationCompleteEvent;
import ru.shutovna.myserf.service.EmailService;
import ru.shutovna.myserf.service.IUserService;

import java.util.UUID;

@Component
@Slf4j
public class RegistrationListener implements ApplicationListener<OnRegistrationCompleteEvent> {
    @Autowired
    private IUserService service;

    @Autowired
    private EmailService emailService;

    @Autowired
    private Environment env;

    // API

    @Override
    public void onApplicationEvent(final OnRegistrationCompleteEvent event) {
        this.confirmRegistration(event);
    }

    private void confirmRegistration(final OnRegistrationCompleteEvent event) {
        final User user = event.getUser();
        final String token = UUID.randomUUID().toString();
        service.createVerificationTokenForUser(user, token);

        final String confirmationUrl = event.getAppUrl() + "/registrationConfirm?token=" + token;
        try {
            emailService.sendConfirmationEmail(user.getEmail(), confirmationUrl);
        } catch (MessagingException e) {
            log.error("Error sending registration verification email to " + user.getEmail(), e);
        }
    }
}
