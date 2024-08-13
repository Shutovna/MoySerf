package ru.shutovna.moyserf.service;


import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.scheduling.annotation.Async;
import ru.shutovna.moyserf.error.EmailSendException;

import javax.mail.MessagingException;
import java.sql.SQLException;

public interface EmailService {
    @Async
    @Retryable(retryFor = EmailSendException.class , maxAttempts = 100, backoff = @Backoff(delay = 100))
    void sendConfirmationEmail(String recipientEmail, String confirmationLink);

    @Async
    @Retryable(retryFor = EmailSendException.class , maxAttempts = 100, backoff = @Backoff(delay = 100))
    void sendResetPasswordEmail(String recipientEmail, String resetLink);

    void reSendConfirmationEmail(String recipientEmail, String confirmationLink);
}
