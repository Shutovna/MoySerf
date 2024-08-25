package ru.shutovna.moyserf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.shutovna.moyserf.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    List<User> findAllByInvitorEquals(User invitor);

    @Query("SELECT COUNT(u) FROM User u WHERE u.orders IS NOT EMPTY")
    int countAdvertisers();

    Boolean existsByEmail(String email);

}
