package ru.shutovna.moyserf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.shutovna.moyserf.model.Wallet;
import ru.shutovna.moyserf.repository.WalletRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class WalletService implements IWalletService {
    @Autowired
    private WalletRepository walletRepository;

    @Override
    public Optional<Wallet> getWallet(long id) {
        return walletRepository.findById(id);
    }

    @Override
    public List<Wallet> getWallets() {
        return walletRepository.findAll();
    }

    @Override
    public Wallet saveWallet(Wallet wallet) {
        return walletRepository.save(wallet);
    }
}
