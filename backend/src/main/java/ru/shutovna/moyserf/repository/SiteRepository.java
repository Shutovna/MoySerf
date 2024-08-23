package ru.shutovna.moyserf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.shutovna.moyserf.model.Site;
import ru.shutovna.moyserf.model.User;

import java.util.List;

public interface SiteRepository extends JpaRepository<Site, Long> {
    List<Site> findByOwnerOrderByCreatedAtDesc(User owner);

    @Query("SELECT s FROM Site s WHERE (SELECT COUNT(o) FROM Order o WHERE o.site.id = s.id and o.closed = false ) > 0" +
            " ORDER BY s.createdAt desc")
    List<Site> findOpenedForView();


}
