package ru.shutovna.moyserf.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.shutovna.moyserf.config.AppProperties;
import ru.shutovna.moyserf.error.EmailSendException;
import ru.shutovna.moyserf.error.InvalidOldPasswordException;
import ru.shutovna.moyserf.error.UserAlreadyExistException;
import ru.shutovna.moyserf.error.UserNotFoundException;
import ru.shutovna.moyserf.model.AuthProvider;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.model.VerificationToken;
import ru.shutovna.moyserf.payload.request.EmailRequest;
import ru.shutovna.moyserf.payload.request.LoginRequest;
import ru.shutovna.moyserf.payload.request.PasswordRequest;
import ru.shutovna.moyserf.payload.request.SignUpRequest;
import ru.shutovna.moyserf.payload.response.ApiResponse;
import ru.shutovna.moyserf.payload.response.AuthResponse;
import ru.shutovna.moyserf.payload.response.UserInfoResponse;
import ru.shutovna.moyserf.security.TokenProvider;
import ru.shutovna.moyserf.security.UserPrincipal;
import ru.shutovna.moyserf.service.EmailService;
import ru.shutovna.moyserf.service.IAuthSService;
import ru.shutovna.moyserf.service.IUserService;
import ru.shutovna.moyserf.util.GenericResponse;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private IUserService userService;

    @Autowired
    private IAuthSService authSService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;

    private final AppProperties appProperties;

    @Autowired
    private MessageSource messages;

    @Autowired
    private EmailService emailService;

    public AuthController(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        User user = userService.findUserByEmail(loginRequest.getEmail()).orElseThrow();

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.createToken(authentication);
        return ResponseEntity.ok(new AuthResponse(token, user));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest, HttpServletRequest request) {
        if (userService.findUserByEmail(signUpRequest.getEmail()).isPresent()) {
            throw new UserAlreadyExistException("There is an account with that email address: " + signUpRequest.getEmail());
        }

        // Creating user's account
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(AuthProvider.local);
        user.setCreatedAt(LocalDateTime.now());

        Long invitorId = signUpRequest.getInvitorId();
        if (invitorId != null) {
            User invitor = userService.findUserByID(invitorId).orElseThrow(() ->
                    new UserNotFoundException("Invitor user " + invitorId + " not found"));
            user.setInvitor(invitor);
            log.info("Referal for " + invitorId + " registered");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User result = userService.registerUser(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(result.getId()).toUri();

        sendRegistrationConfirmationEmail(request, user);

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "User registered successfully@"));
    }


    @GetMapping("/registrationConfirm")
    public ResponseEntity<?> registrationConfirm(@RequestParam String token) {
        IAuthSService.VerificationTokenStatus status = authSService.validateVerificationToken(token);
        log.debug("registrationConfirm token: " + token + " result: " + status);
        if (status == IAuthSService.VerificationTokenStatus.TOKEN_VALID) {
            authSService.verifyUserRegistration(token);
        }
        return ResponseEntity.ok()
                .body(new ApiResponse(true, status.getName()));
    }

    @GetMapping("/resendRegistrationToken")
    public GenericResponse resendRegistrationToken(final HttpServletRequest request, @RequestParam("token") final String existingToken) {
        final VerificationToken newToken = authSService.generateNewVerificationToken(existingToken);
        final User user = authSService.getUser(newToken.getToken());
        sendRegistrationConfirmationEmail(request, user);
        return new GenericResponse(messages.getMessage("message.resendToken", null, request.getLocale()));
    }

    private void sendRegistrationConfirmationEmail(HttpServletRequest request, User user) {
        final String token = UUID.randomUUID().toString();

        authSService.createVerificationTokenForUser(user, token);
        final String confirmationUrl = getAppUrl(request, appProperties.getFrontend().getPort()) + "/auth/registrationConfirm?token=" + token;
        try {
            emailService.sendConfirmationEmail(user.getEmail(), confirmationUrl);
            log.info("Registration verification email sent to {}", user.getEmail());
        } catch (Exception e) {
            log.warn("Error sending registration verification email to {}", user.getEmail(), e);
            throw new EmailSendException(e);
        }
    }


    @GetMapping("/userInfo")
    public ResponseEntity<UserInfoResponse> getUserInfo(@AuthenticationPrincipal UserDetails userDetails) {
        log.debug("getUserInfo for AuthenticationPrincipal: " + userDetails);
        String email = userDetails.getUsername();

        User user = userService.findUserByEmail(email).orElseThrow();

        UserInfoResponse response = UserInfoResponse.from(user);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/userInfo/{userId:\\d+}")
    public ResponseEntity<UserInfoResponse> getUserInfoById(@PathVariable Long userId) {
        log.debug("getUserInfoById for {}}", userId);
        User user = userService.findUserByID(userId).orElseThrow(() -> new UserNotFoundException("Not found"));
        UserInfoResponse response = UserInfoResponse.from(user);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/resetPassword")
    public GenericResponse resetPassword(final HttpServletRequest request, @Valid @RequestBody EmailRequest emailRequest) {
        final User user = userService.findUserByEmail(emailRequest.getEmail()).orElseThrow(UserNotFoundException::new);
        if (user != null) {
            final String token = UUID.randomUUID().toString();
            authSService.createPasswordResetTokenForUser(user, token);
            final String url = getAppUrl(request, appProperties.getFrontend().getPort())
                    + String.format("/auth/savePassword?email=%s&token=%s", user.getEmail(), token);
            emailService.sendResetPasswordEmail(emailRequest.getEmail(), url);
        }
        return new GenericResponse(messages.getMessage("message.resetPasswordEmail", null, request.getLocale()));
    }

    @PostMapping("/savePassword")
    public ResponseEntity<GenericResponse> savePassword(final Locale locale, @Valid @RequestBody PasswordRequest passwordDto) {

        final String result = authSService.validatePasswordResetToken(passwordDto.getToken());

        if (result != null) {
            return ResponseEntity.badRequest()
                    .body(new GenericResponse(messages.getMessage("auth.message." + result, null, locale), "Invalid token"));
        }

        Optional<User> user = authSService.getUserByPasswordResetToken(passwordDto.getToken());
        if (user.isPresent()) {
            authSService.changeUserPassword(user.get(), passwordDto.getNewPassword());
            log.info("Resetted password saved for " + user.get().getEmail());
            return ResponseEntity.ok()
                    .body(new GenericResponse(messages.getMessage("message.resetPasswordSuc", null, locale)));

        } else {
            return ResponseEntity.badRequest()
                    .body(new GenericResponse(messages.getMessage("auth.message.invalidUser", null, locale), "InvalidUser"));

        }
    }

    @PostMapping("/updatePassword")
    public GenericResponse changeUserPassword(final Locale locale, @Valid @RequestBody PasswordRequest passwordRequest) {
        final User user = userService.findUserByEmail(((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getEmail()).orElseThrow();
        if (!authSService.checkIfValidOldPassword(user, passwordRequest.getOldPassword())) {
            throw new InvalidOldPasswordException();
        }
        authSService.changeUserPassword(user, passwordRequest.getNewPassword());
        log.info("Password changed for {}", user.getEmail());
        return new GenericResponse(messages.getMessage("message.updatePasswordSuc", null, locale));
    }

    private String getAppUrl(HttpServletRequest request, int port) {
        return "http://" + request.getServerName() + ":" + port + request.getContextPath();
    }
}
