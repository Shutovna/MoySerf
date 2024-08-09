package ru.shutovna.moyserf.test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;
import ru.shutovna.moyserf.persistence.dao.UserRepository;
import ru.shutovna.moyserf.persistence.dao.VerificationTokenRepository;
import ru.shutovna.moyserf.persistence.model.User;
import ru.shutovna.moyserf.persistence.model.VerificationToken;
import ru.shutovna.moyserf.spring.TestDbConfig;
import ru.shutovna.moyserf.spring.TestTaskConfig;
import ru.shutovna.moyserf.task.TokensPurgeTask;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = { TestDbConfig.class, TestTaskConfig.class })
@Transactional
class TokenExpirationIntegrationTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private TokensPurgeTask tokensPurgeTask;

    @PersistenceContext
    private EntityManager entityManager;

    private Long token_id;
    private Long user_id;

    //

    @BeforeEach
    public void givenUserWithExpiredToken() {

        // we need a clear token repository
        tokenRepository.deleteAll();

        User user = new User();
        user.setEmail(UUID.randomUUID().toString() + "@example.com");
        user.setPassword(UUID.randomUUID().toString());
        user.setFirstName("First");
        user.setLastName("Last");

        entityManager.persist(user);
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken(token, user);
        verificationToken.setExpiryDate(Date.from(Instant.now().minus(2, ChronoUnit.DAYS)));

        entityManager.persist(verificationToken);

        /*
            flush managed entities to the database to populate identifier field
         */
        entityManager.flush();

        /*
            remove managed entities from the persistence context
            so that subsequent SQL queries hit the database
         */
        entityManager.clear();

        token_id = verificationToken.getId();
        user_id = user.getId();
    }

    @Test
    void whenContextLoad_thenCorrect() {
    	assertNotNull(user_id);
    	assertNotNull(token_id);
    	assertTrue(userRepository.findById(user_id).isPresent());

        Optional<VerificationToken> verificationToken = tokenRepository.findById(token_id);
        assertTrue(verificationToken.isPresent());
        assertTrue(tokenRepository.findAllByExpiryDateLessThan(Date.from(Instant.now())).anyMatch((token) -> token.equals(verificationToken.get())));
    }

    @AfterEach
    public void flushAfter() {
        entityManager.flush();
    }

    @Test
    void whenRemoveByGeneratedQuery_thenCorrect() {
        tokenRepository.deleteByExpiryDateLessThan(Date.from(Instant.now()));
        assertEquals(0, tokenRepository.count());
    }

    @Test
    void whenRemoveByJPQLQuery_thenCorrect() {
        tokenRepository.deleteAllExpiredSince(Date.from(Instant.now()));
        assertEquals(0, tokenRepository.count());
    }

    @Test
    void whenPurgeTokenTask_thenCorrect() {
        tokensPurgeTask.purgeExpired();
        assertFalse(tokenRepository.findById(token_id).isPresent());
    }
}
