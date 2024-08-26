package ru.shutovna.moyserf.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.shutovna.moyserf.error.ResourceNotFoundException;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.payload.response.MostActiveUserResponse;
import ru.shutovna.moyserf.payload.response.MyReferalResponse;
import ru.shutovna.moyserf.security.CurrentUser;
import ru.shutovna.moyserf.security.UserPrincipal;
import ru.shutovna.moyserf.service.IUserService;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private IUserService userService;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userService.findUserByID(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @GetMapping("/mostActive")
    public ResponseEntity<List<MostActiveUserResponse>> getMostActiveUsers() {
        List<MostActiveUserResponse> mostActiveUsers = userService.getMostActiveUsers();
        return ResponseEntity.ok().body(mostActiveUsers);
    }

    @GetMapping("/getMyReferals")
    public ResponseEntity<List<MyReferalResponse>> getMyReferals() {
        List<User> referals = userService.getMyReferals();
        List<MyReferalResponse> response = referals.stream().map(user -> {
            long earnedSum = user.getViews().stream().mapToLong(
                            view -> view.getTransaction().getSum())
                    .sum();
            return new MyReferalResponse(user.getId(), user.getName(), earnedSum);
        }).toList();
        return ResponseEntity.ok(response);
    }


}
