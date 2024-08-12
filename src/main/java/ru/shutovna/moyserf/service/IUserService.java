package ru.shutovna.moyserf.service;
import ru.shutovna.moyserf.model.User;

import java.util.Optional;

public interface IUserService {

    User saveUser(User user);

    void deleteUser(User user);

    Optional<User> getUserByID(long id);

    Optional<User> findUserByEmail(String email);
}
