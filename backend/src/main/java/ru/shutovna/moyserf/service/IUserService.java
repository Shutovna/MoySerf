package ru.shutovna.moyserf.service;
import ru.shutovna.moyserf.model.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    User saveUser(User user);

    void deleteUser(User user);

    Optional<User> findUserByID(long id);

    Optional<User> findUserByEmail(String email);

    List<User> getMostActiveUsers();
}
