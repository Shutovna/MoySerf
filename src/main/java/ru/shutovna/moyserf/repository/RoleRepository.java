package ru.shutovna.moyserf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.shutovna.moyserf.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);

    @Override
    void delete(Role role);

}
