package ru.shutovna.moyserf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.shutovna.moyserf.model.Site;
import ru.shutovna.moyserf.model.User;

import java.util.List;

public interface SiteRepository extends JpaRepository<Site, Long> {
    List<Site> findByOwner(User owner);


}
