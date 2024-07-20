package ru.shutovna.myserf.persistence.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import ru.shutovna.myserf.persistence.model.NewLocationToken;
import ru.shutovna.myserf.persistence.model.UserLocation;

public interface NewLocationTokenRepository extends JpaRepository<NewLocationToken, Long> {

    NewLocationToken findByToken(String token);

    NewLocationToken findByUserLocation(UserLocation userLocation);

}
