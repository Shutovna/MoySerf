package ru.shutovna.moyserf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.shutovna.moyserf.model.PasswordResetToken;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.model.VerificationToken;
import ru.shutovna.moyserf.repository.PasswordResetTokenRepository;
import ru.shutovna.moyserf.repository.UserRepository;
import ru.shutovna.moyserf.repository.VerificationTokenRepository;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private PasswordResetTokenRepository passwordTokenRepository;

    // API
    @Override
    public Optional<User> findUserByID(final long id) {
        return userRepository.findById(id);
    }

    @Override
    public User saveUser(final User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(final User user) {
        final VerificationToken verificationToken = tokenRepository.findByUser(user);

        if (verificationToken != null) {
            tokenRepository.delete(verificationToken);
        }

        final PasswordResetToken passwordToken = passwordTokenRepository.findByUser(user);

        if (passwordToken != null) {
            passwordTokenRepository.delete(passwordToken);
        }

        userRepository.delete(user);
    }

    @Override
    public Optional<User> findUserByEmail(final String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getMostActiveUsers() {
        return userRepository.findAll().stream().limit(5).toList();
    }
}
