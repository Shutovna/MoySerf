package ru.shutovna.moyserf.service;

import lombok.extern.slf4j.Slf4j;
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
import ru.shutovna.moyserf.payload.response.MostActiveUserResponse;
import ru.shutovna.moyserf.repository.PasswordResetTokenRepository;
import ru.shutovna.moyserf.repository.UserRepository;
import ru.shutovna.moyserf.repository.VerificationTokenRepository;
import ru.shutovna.moyserf.repository.WalletRepository;
import ru.shutovna.moyserf.util.Constants;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class UserService implements IUserService {
    @PersistenceContext
    private EntityManager em;

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
    public Optional<User> findUserByID(final Integer id) {
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
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<MostActiveUserResponse> getMostActiveUsers() {
        Map<Integer, BigDecimal> totalIncomes = getAllUsersTotalIncome().stream().collect(Collectors.toMap(
                key -> (Integer) key[0], val -> (BigDecimal) val[1]));

        List<MostActiveUserResponse> result = findAllUsers().stream().filter(user ->
                        totalIncomes.containsKey(user.getId()))
                .map(user -> MostActiveUserResponse.fromUser(user, totalIncomes.get(user.getId())))
                .toList();

        log.debug("getMostActiveUsers:" + result);
        return result;
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

        Optional<User> userByEmail;
        if (principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;
            userByEmail = findUserByEmail(userDetails.getUsername());
        } else {
            userByEmail = findUserByEmail(principal.toString());
        }

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

    @Override
    public List<Object[]> getAllUsersTotalIncome() {
        Query query = em.createNativeQuery(
                "select t.user_id user_id, sum(t.sum) sum\n" +
                        "from transactions t \n" +
                        "where t.type in('USER_EARNED_SITE_VIEW', 'USER_EARNED_REFERAL_SITE_VIEW')\n" +
                        "group by t.user_id\n" +
                        "order by sum desc\n" +
                        "limit 5\n");
        return query.getResultList();
    }

    @Override
    public int getAdvertisersCount() {
        return userRepository.countAdvertisers();
    }
}
