package ru.shutovna.myserf.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.shutovna.myserf.entity.Role;
import ru.shutovna.myserf.entity.User;
import ru.shutovna.myserf.repository.UserRepository;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CustomUserDetailsServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CustomUserDetailsService customUserDetailsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void loadUserByUsername_UserFound() {
        // Arrange
        String nameOrEmail = "testuser";
        Role role = new Role();
        role.setName("ROLE_USER");

        User user = new User();
        user.setEmail("testuser@example.com");
        user.setPassword("password");
        user.setRoles(Set.of(role));

        when(userRepository.findByNameOrEmail(nameOrEmail, nameOrEmail)).thenReturn(Optional.of(user));

        // Act
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(nameOrEmail);

        // Assert
        assertNotNull(userDetails);
        assertEquals(user.getEmail(), userDetails.getUsername());
        assertEquals(user.getPassword(), userDetails.getPassword());

        Set<GrantedAuthority> authorities = user.getRoles()
                .stream()
                .map((r) -> new org.springframework.security.core.authority.SimpleGrantedAuthority(r.getName()))
                .collect(Collectors.toSet());

        assertEquals(authorities, userDetails.getAuthorities());
    }

    @Test
    void loadUserByUsername_UserNotFound() {
        // Arrange
        String nameOrEmail = "nonexistentuser";
        when(userRepository.findByNameOrEmail(nameOrEmail, nameOrEmail)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UsernameNotFoundException.class, () -> customUserDetailsService.loadUserByUsername(nameOrEmail));
    }
}