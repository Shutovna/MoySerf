package ru.shutovna.moyserf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import ru.shutovna.moyserf.error.SystemUserNotFoundError;
import ru.shutovna.moyserf.error.UserNotFoundException;
import ru.shutovna.moyserf.model.PasswordResetToken;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.model.VerificationToken;
import ru.shutovna.moyserf.model.Wallet;
import ru.shutovna.moyserf.repository.PasswordResetTokenRepository;
import ru.shutovna.moyserf.repository.UserRepository;
import ru.shutovna.moyserf.repository.VerificationTokenRepository;
import ru.shutovna.moyserf.repository.WalletRepository;
import ru.shutovna.moyserf.util.Constants;

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
    private WalletRepository walletRepository;

    @Autowired
    private PasswordResetTokenRepository passwordTokenRepository;

    // API
    @Override
    public Optional<User> findUserByID(final long id) {
        return userRepository.findById(id);
    }

    @Override
    public User registerUser(final User user) {
        User saved = userRepository.save(user);

        Wallet wallet = new Wallet();
        wallet.setUser(saved);
        //todo
        wallet.setSum(1000 * 100);
        walletRepository.save(wallet);

        return saved;
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

    @Override
    public List<User> getMyReferals() {
        User currentUser = getCurrentUser();
        return userRepository.findAllByInvitorEquals(currentUser);
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        UserDetails userDetails = (UserDetails) principal;
        Optional<User> userByEmail = findUserByEmail(userDetails.getUsername());
        if (userByEmail.isPresent()) {
            return userByEmail.get();
        }

        throw new UserNotFoundException("User not found");
    }

    @Override
    public User getSystemUser() {
        return userRepository.findById(Constants.SYSTEM_USER_ID).orElseThrow(() ->
                new SystemUserNotFoundError("System user not found"));
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }
}
