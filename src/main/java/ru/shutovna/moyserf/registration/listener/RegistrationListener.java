package ru.shutovna.moyserf.registration.listener;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.core.env.Environment;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import org.springframework.stereotype.Service;
import ru.shutovna.moyserf.error.MailSendException;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.registration.OnRegistrationCompleteEvent;
import ru.shutovna.moyserf.service.EmailService;
import ru.shutovna.moyserf.service.IAuthSService;
import ru.shutovna.moyserf.service.IUserService;


import java.util.UUID;

@Service
@Slf4j
public class RegistrationListener implements ApplicationListener<OnRegistrationCompleteEvent> {
    @Autowired
    private IAuthSService authSService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private Environment env;

    // API

    @Override
    public void onApplicationEvent(final OnRegistrationCompleteEvent event) {

        try {
            this.confirmRegistration(event);
        } catch (MailSendException ignored) {

        }

    }

    @Async
    @Retryable(value = { MailSendException.class},
            maxAttempts = 5,
            backoff = @Backoff(delay = 2000, multiplier = 2))
    public void confirmRegistration(final OnRegistrationCompleteEvent event) throws MailSendException {
        final User user = event.getUser();
        final String token = UUID.randomUUID().toString();
        authSService.createVerificationTokenForUser(user, token);

        final String confirmationUrl = event.getAppUrl() + "/auth/registrationConfirm?token=" + token;
        try {
            emailService.sendConfirmationEmail(user.getEmail(), confirmationUrl);
            log.info("Registration verification email sent to {}", user.getEmail());
        } catch (Exception e) {
            log.warn("Error sending registration verification email to {}", user.getEmail(), e);
            throw new MailSendException(e);
        }
    }
}
