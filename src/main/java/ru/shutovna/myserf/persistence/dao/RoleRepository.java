package ru.shutovna.myserf.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.shutovna.myserf.persistence.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);

    @Override
    void delete(Role role);

}
