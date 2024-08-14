package ru.shutovna.moyserf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.shutovna.moyserf.model.Site;

public interface SiteRepository extends JpaRepository<Site, Long> {
}
