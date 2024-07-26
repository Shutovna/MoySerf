package ru.shutovna.myserf.web.controller;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.core.env.Environment;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.shutovna.myserf.persistence.model.PasswordResetToken;
import ru.shutovna.myserf.persistence.model.User;
import ru.shutovna.myserf.persistence.model.VerificationToken;
import ru.shutovna.myserf.registration.OnRegistrationCompleteEvent;
import ru.shutovna.myserf.security.ISecurityUserService;
import ru.shutovna.myserf.service.EmailService;
import ru.shutovna.myserf.service.IUserService;
import ru.shutovna.myserf.web.dto.PasswordDto;
import ru.shutovna.myserf.web.dto.UserDto;
import ru.shutovna.myserf.web.error.InvalidOldPasswordException;
import ru.shutovna.myserf.web.util.GenericResponse;

import java.io.UnsupportedEncodingException;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

@RestController
@Slf4j
public class RegistrationRestController {
    @Autowired
    private IUserService userService;

    @Autowired
    private ISecurityUserService securityUserService;

    @Autowired
    private MessageSource messages;

    @Autowired
    private ApplicationEventPublisher eventPublisher;
    @Autowired
    private EmailService emailService;

    public RegistrationRestController() {
        super();
    }


    // Registration
    @PostMapping("/user/registration")
    @Transactional
    public GenericResponse registerUserAccount(@Valid @RequestBody final UserDto accountDto, final HttpServletRequest request) {
        log.debug("Registering user account with information: {}", accountDto);

        final User registered = userService.registerNewUserAccount(accountDto);
        eventPublisher.publishEvent(new OnRegistrationCompleteEvent(registered, request.getLocale(), getAppUrl(request)));
        return new GenericResponse("success");
    }

    // User activation - verification
    @GetMapping("/user/resendRegistrationToken")
    public GenericResponse resendRegistrationToken(final HttpServletRequest request, @RequestParam("token") final String existingToken) {
        log.debug("resendRegistrationToken");
        final VerificationToken newToken = userService.generateNewVerificationToken(existingToken);
        final User user = userService.getUser(newToken.getToken());

        final String confirmationUrl = getAppUrl(request) + "/registrationConfirm.html?token=" + newToken.getToken();
        try {
            emailService.reSendConfirmationEmail(user.getEmail(), confirmationUrl);
        } catch (MessagingException e) {
            log.error("Error resendingRegistrationToken", e);
        }
        return new GenericResponse(messages.getMessage("message.resendToken", null, request.getLocale()));
    }

    // Reset password
    @PostMapping("/user/resetPassword")
    public GenericResponse resetPassword(final HttpServletRequest request, @RequestParam("email") final String userEmail) {
        final User user = userService.findUserByEmail(userEmail);
        if (user != null) {
            final String token = UUID.randomUUID().toString();

            Optional<PasswordResetToken> oldToken = userService.getPasswordResetTokenByUser(user);
            if (oldToken.isPresent()) {
                String val = oldToken.get().getToken();
                userService.deletePasswordResetToken(val);
            }

            final String url = getAppUrl(request) + "/user/changePassword?token=" + token;
            try {
                emailService.sendResetPasswordEmail(user.getEmail(), url);
                userService.createPasswordResetTokenForUser(user, token);
            } catch (MessagingException e) {
                log.error("Error sending password reset email", e);
                return new GenericResponse("", messages.getMessage("message.error", null, request.getLocale()));
            }

        }
        return new GenericResponse(messages.getMessage("message.resetPasswordEmail", null, request.getLocale()));
    }

    // Save password
    @PostMapping("/user/savePassword")
    public GenericResponse savePassword(final Locale locale, @Valid PasswordDto passwordDto) {

        final String result = securityUserService.validatePasswordResetToken(passwordDto.getToken());

        if (result != null) {
            return new GenericResponse(messages.getMessage("auth.message." + result, null, locale));
        }

        Optional<User> user = userService.getUserByPasswordResetToken(passwordDto.getToken());
        if (user.isPresent()) {
            userService.changeUserPassword(user.get(), passwordDto.getNewPassword());
            return new GenericResponse(messages.getMessage("message.resetPasswordSuc", null, locale));
        } else {
            return new GenericResponse(messages.getMessage("auth.message.invalid", null, locale));
        }
    }

    // Change user password
    @PostMapping("/user/updatePassword")
    public GenericResponse changeUserPassword(final Locale locale, @Valid PasswordDto passwordDto) {
        final User user = userService.findUserByEmail(((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getEmail());
        if (!userService.checkIfValidOldPassword(user, passwordDto.getOldPassword())) {
            throw new InvalidOldPasswordException();
        }
        userService.changeUserPassword(user, passwordDto.getNewPassword());
        return new GenericResponse(messages.getMessage("message.updatePasswordSuc", null, locale));
    }

    // Change user 2 factor authentication
    @PostMapping("/user/update/2fa")
    public GenericResponse modifyUser2FA(@RequestParam("use2FA") final boolean use2FA) throws UnsupportedEncodingException {
        final User user = userService.updateUser2FA(use2FA);
        if (use2FA) {
            return new GenericResponse(userService.generateQRUrl(user));
        }
        return null;
    }

    // ============== NON-API ============

    private String getAppUrl(HttpServletRequest request) {
        return "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    }
}