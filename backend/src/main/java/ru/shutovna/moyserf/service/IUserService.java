package ru.shutovna.moyserf.service;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.payload.response.MostActiveUserResponse;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    User registerUser(User user);

    void deleteUser(User user);

    Optional<User> findUserByID(Integer id);

    Optional<User> findUserByEmail(String email);

    List<User> findAllUsers();

    List<MostActiveUserResponse> getMostActiveUsers();

    List<User> getMyReferals();

    User getCurrentUser();

    User getSystemUser();

    Optional<User> findByEmail(String email);

    User save(User user);

    List<Object[]> getAllUsersTotalIncome();

    int getAdvertisersCount();
}
