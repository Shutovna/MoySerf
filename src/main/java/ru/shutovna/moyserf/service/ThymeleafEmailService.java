package ru.shutovna.moyserf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
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
    public void sendConfirmationEmail(String recipientEmail, String confirmationLink) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        Context context = new Context();
        context.setVariable("confirmationLink", confirmationLink);

        String emailContent = templateEngine.process("emailConfirmationTemplate", context);
        helper.setFrom(supportEmail);
        helper.setTo(recipientEmail);
        helper.setSubject("Подтверждение регистрации");
        helper.setText(emailContent, true);

        javaMailSender.send(message);
    }

    @Override
    public void sendResetPasswordEmail(String recipientEmail, String resetLink) throws MessagingException {
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
    }

    @Override
    public void reSendConfirmationEmail(String recipientEmail, String confirmationLink) throws MessagingException {
        sendConfirmationEmail(recipientEmail, confirmationLink);
    }

}

