package ru.shutovna.moyserf.registration.listener;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.registration.OnRegistrationCompleteEvent;
import ru.shutovna.moyserf.service.EmailService;
import ru.shutovna.moyserf.service.IUserService;


import javax.mail.MessagingException;
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
