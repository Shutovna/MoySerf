package ru.shutovna.myserf.service;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendConfirmationEmail(String recipientEmail, String confirmationLink) throws MessagingException;

    void sendResetPasswordEmail(String recipientEmail, String resetLink) throws MessagingException;

    void reSendConfirmationEmail(String recipientEmail, String confirmationLink) throws MessagingException;
}
