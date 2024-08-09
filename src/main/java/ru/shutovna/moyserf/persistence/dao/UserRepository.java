package ru.shutovna.moyserf.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.shutovna.moyserf.persistence.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    @Override
    void delete(User user);

}
