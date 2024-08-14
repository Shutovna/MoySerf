package ru.shutovna.moyserf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.shutovna.moyserf.model.Wallet;

public interface WalletRepository extends JpaRepository<Wallet, Long> {
}
