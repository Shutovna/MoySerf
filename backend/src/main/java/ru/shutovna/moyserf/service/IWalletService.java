package ru.shutovna.moyserf.service;

import ru.shutovna.moyserf.model.Wallet;

import java.util.List;
import java.util.Optional;

public interface IWalletService {
    Optional<Wallet> getWallet(long id);

    List<Wallet> getWallets();

    Wallet saveWallet(Wallet wallet);
}
