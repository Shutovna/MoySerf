package ru.shutovna.myserf.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import ru.shutovna.myserf.controller.AuthController;
import ru.shutovna.myserf.entity.User;
import ru.shutovna.myserf.entity.Role;
import ru.shutovna.myserf.payload.LoginDto;
import ru.shutovna.myserf.payload.SignUpDto;
import ru.shutovna.myserf.repository.UserRepository;
import ru.shutovna.myserf.repository.RoleRepository;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class AuthControllerTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void authenticateUser_Success() {
        // Arrange
        LoginDto loginDto = new LoginDto();
        loginDto.setNameOrEmail("testuser");
        loginDto.setPassword("password");

        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);

        SecurityContext securityContext = mock(SecurityContext.class);
        SecurityContextHolder.setContext(securityContext);

        // Act
        ResponseEntity<String> responseEntity = authController.authenticateUser(loginDto);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("User signed-in successfully!.", responseEntity.getBody());
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    void registerUser_Success() {
        // Arrange
        SignUpDto signUpDto = new SignUpDto();
        signUpDto.setName("newuser");
        signUpDto.setEmail("newuser@example.com");
        signUpDto.setPassword("password");

        when(userRepository.existsByName(anyString())).thenReturn(false);
        when(userRepository.existsByEmail(anyString())).thenReturn(false);

        Role role = new Role();
        role.setName("ROLE_USER");
        when(roleRepository.findByName(anyString())).thenReturn(Optional.of(role));

        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");

        // Act
        ResponseEntity<?> responseEntity = authController.registerUser(signUpDto);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("User registered successfully", responseEntity.getBody());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void registerUser_UsernameExists() {
        // Arrange
        SignUpDto signUpDto = new SignUpDto();
        signUpDto.setName("existinguser");
        signUpDto.setEmail("newuser@example.com");
        signUpDto.setPassword("password");

        when(userRepository.existsByName(anyString())).thenReturn(true);

        // Act
        ResponseEntity<?> responseEntity = authController.registerUser(signUpDto);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals("Username is already taken!", responseEntity.getBody());
    }

    @Test
    void registerUser_EmailExists() {
        // Arrange
        SignUpDto signUpDto = new SignUpDto();
        signUpDto.setName("newuser");
        signUpDto.setEmail("existinguser@example.com");
        signUpDto.setPassword("password");

        when(userRepository.existsByName(anyString())).thenReturn(false);
        when(userRepository.existsByEmail(anyString())).thenReturn(true);

        // Act
        ResponseEntity<?> responseEntity = authController.registerUser(signUpDto);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals("Email is already taken!", responseEntity.getBody());
    }
}