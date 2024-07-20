package ru.shutovna.myserf.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.ListPagingAndSortingRepository;
import ru.shutovna.myserf.entity.User;

import java.util.Optional;

public interface UserRepository extends ListPagingAndSortingRepository<User, Integer>, CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Optional<User> findByNameOrEmail(String username, String email);

    Optional<User> findByName(String username);

    Boolean existsByName(String username);

    Boolean existsByEmail(String email);
}
