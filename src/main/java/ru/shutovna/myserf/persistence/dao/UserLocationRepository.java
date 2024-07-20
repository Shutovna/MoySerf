package ru.shutovna.myserf.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.shutovna.myserf.persistence.model.User;
import ru.shutovna.myserf.persistence.model.UserLocation;

public interface UserLocationRepository extends JpaRepository<UserLocation, Long> {
    UserLocation findByCountryAndUser(String country, User user);

}
