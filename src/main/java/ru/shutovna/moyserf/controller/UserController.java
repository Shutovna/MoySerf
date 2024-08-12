package ru.shutovna.moyserf.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.shutovna.moyserf.exception.ResourceNotFoundException;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.payload.UserResponse;
import ru.shutovna.moyserf.repository.UserRepository;
import ru.shutovna.moyserf.security.CurrentUser;
import ru.shutovna.moyserf.security.UserPrincipal;
import ru.shutovna.moyserf.service.IUserService;

import java.util.List;

@RestController("/api/users")
public class UserController {

    @Autowired
    private IUserService userService;

    @GetMapping
    public UserResponse test() {
        return new UserResponse()   ;
    }

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userService.findUserByID(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @GetMapping("/mostActive")
    public ResponseEntity<List<User>> getMostActiveUsers() {
        List<User> mostActiveUsers = userService.getMostActiveUsers();
        return ResponseEntity.ok(mostActiveUsers);
    }
}
