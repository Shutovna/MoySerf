package ru.shutovna.moyserf.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import ru.shutovna.moyserf.error.EmailSendException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@Slf4j
public class ThymeleafEmailService implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Value("${support.email}")
    private String supportEmail;

    @Autowired
    private MessageSource messages;


    @Override
    public void sendConfirmationEmail(String recipientEmail, String confirmationLink) {
        log.debug("Sending confirmation email to " + recipientEmail);
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            Context context = new Context();
            context.setVariable("confirmationLink", confirmationLink);

            String emailContent = templateEngine.process("emailConfirmationTemplate", context);
            helper.setFrom(supportEmail);
            helper.setTo(recipientEmail);
            helper.setSubject("Подтверждение регистрации");
            helper.setText(emailContent, true);

            javaMailSender.send(message);
        } catch (Exception e) {
            log.warn("Failed to send confirmation email to " + recipientEmail);
            throw new EmailSendException(e);
        }
    }

    @Override
    public void sendResetPasswordEmail(String recipientEmail, String resetLink) {
        try {
            log.debug("Sending reset password email to " + recipientEmail);
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            Context context = new Context();
            context.setVariable("resetLink", resetLink);
            context.setVariable("supportEmail", supportEmail);

            String emailContent = templateEngine.process("emailResetPasswordTemplate", context);
            helper.setFrom(supportEmail);
            helper.setTo(recipientEmail);
            helper.setSubject("Сброс пароля");
            helper.setText(emailContent, true);

            javaMailSender.send(message);
        } catch (Exception e) {
            log.warn("Failed to send reset password email to " + recipientEmail);
            throw new EmailSendException(e);
        }
    }

    @Override
    public void reSendConfirmationEmail(String recipientEmail, String confirmationLink) {
        sendConfirmationEmail(recipientEmail, confirmationLink);
    }

}

