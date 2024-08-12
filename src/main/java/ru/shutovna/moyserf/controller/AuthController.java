package ru.shutovna.moyserf.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.shutovna.moyserf.config.AppProperties;
import ru.shutovna.moyserf.error.UserAlreadyExistException;
import ru.shutovna.moyserf.model.AuthProvider;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.payload.ApiResponse;
import ru.shutovna.moyserf.payload.AuthResponse;
import ru.shutovna.moyserf.payload.LoginRequest;
import ru.shutovna.moyserf.payload.SignUpRequest;
import ru.shutovna.moyserf.registration.OnRegistrationCompleteEvent;
import ru.shutovna.moyserf.security.TokenProvider;
import ru.shutovna.moyserf.service.IAuthSService;
import ru.shutovna.moyserf.service.IUserService;
import ru.shutovna.moyserf.service.MyService;


import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.security.Principal;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthController implements ApplicationListener<ContextRefreshedEvent> {

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

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    private AppProperties appProperties;

    @Autowired
    private MyService myService;

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
        return ResponseEntity.ok(new AuthResponse(token, user.getEmail(), user.getName()));
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

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User result = userService.saveUser(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(result.getId()).toUri();

        eventPublisher.publishEvent(new OnRegistrationCompleteEvent(
                result, request.getLocale(),
                appProperties.getFrontend().getUrl()));

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

    @GetMapping("/userInfo")
    public ResponseEntity<Map<String, Object>> getUserInfo(Principal principal) {
        log.debug("getUserInfo for principal: " + principal.getName());
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("username", principal.getName());

        return ResponseEntity.ok(userInfo);
    }


    private String getAppUrl(HttpServletRequest request) {
        return "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        try {
            myService.retryServiceWithCustomization("");
        } catch (SQLException e) {

        }
    }
}
