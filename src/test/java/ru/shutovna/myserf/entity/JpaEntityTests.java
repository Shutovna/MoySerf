package ru.shutovna.myserf.entity;

import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import ru.shutovna.myserf.entity.*;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@ActiveProfiles("test")
@DataJpaTest
@Transactional
@Rollback
public class JpaEntityTests {

    @Autowired
    private EntityManager entityManager;

    @Test
    public void testLogEntity() {
        Log log = new Log();
        log.setCreatedAt(LocalDateTime.now());
        log.setThread("main");
        log.setMessage("This is a test log message");

        entityManager.persist(log);
        entityManager.flush();

        Log found = entityManager.find(Log.class, log.getId());
        assertThat(found).isNotNull();
        assertThat(found.getThread()).isEqualTo(log.getThread());
    }

    @Test
    public void testOrderEntity() {
        User user = getUser();

        Site site = getSite(user);

        TransactionType transactionType = getTransactionType();

        Wallet wallet = getWallet(user);

        Transaction transaction = getTransaction(transactionType, wallet);

        Order order = getOrder(user, site, transaction);

        entityManager.persist(user);
        entityManager.persist(site);
        entityManager.persist(wallet);
        entityManager.persist(transactionType);
        entityManager.persist(transaction);
        entityManager.persist(order);
        entityManager.flush();

        Order found = entityManager.find(Order.class, order.getId());
        assertThat(found).isNotNull();
        assertThat(found.getViewCount()).isEqualTo(order.getViewCount());
        assertThat(found.getUser().getId()).isEqualTo(user.getId());
    }

    @Test
    public void testUserEntity() {
        User user = getUser();

        entityManager.persist(user);
        entityManager.flush();

        User found = entityManager.find(User.class, user.getId());
        assertThat(found).isNotNull();
        assertThat(found.getName()).isEqualTo(user.getName());
    }



    @Test
    public void testSiteEntity() {
        User owner = getUser();

        Site site = getSite(owner);

        entityManager.persist(owner);
        entityManager.persist(site);
        entityManager.flush();

        Site found = entityManager.find(Site.class, site.getId());
        assertThat(found).isNotNull();
        assertThat(found.getName()).isEqualTo(site.getName());
    }

    @Test
    public void testTransactionEntity() {
        TransactionType type = getTransactionType();

        User user = getUser();

        Wallet wallet = getWallet(user);

        Transaction transaction = getTransaction(type, wallet);

        entityManager.persist(type);
        entityManager.persist(user);
        entityManager.persist(wallet);
        entityManager.persist(transaction);
        entityManager.flush();

        Transaction found = entityManager.find(Transaction.class, transaction.getId());
        assertThat(found).isNotNull();
        assertThat(found.getDescription()).isEqualTo(transaction.getDescription());
        assertThat(found.getType().getName()).isEqualTo(type.getName());
    }




    @Test
    public void testViewEntity() {
        User user = getUser();

        Site site = getSite(user);

        TransactionType transactionType = getTransactionType();

        Wallet wallet = getWallet(user);

        Transaction transaction = getTransaction(transactionType, wallet);

        View view = new View();
        view.setUser(user);
        view.setSite(site);
        view.setViewedAt(LocalDateTime.now());
        view.setTransaction(transaction);

        entityManager.persist(user);
        entityManager.persist(site);
        entityManager.persist(wallet);
        entityManager.persist(transactionType);
        entityManager.persist(transaction);
        entityManager.persist(view);
        entityManager.flush();

        View found = entityManager.find(View.class, view.getId());
        assertThat(found).isNotNull();
        assertThat(found.getUser().getId()).isEqualTo(user.getId());
        assertThat(found.getSite().getId()).isEqualTo(site.getId());
    }

    @Test
    public void testWalletEntity() {
        User user = getUser();

        Wallet wallet = getWallet(user);

        entityManager.persist(user);
        entityManager.persist(wallet);
        entityManager.flush();

        Wallet found = entityManager.find(Wallet.class, wallet.getId());
        assertThat(found).isNotNull();
        assertThat(found.getSum()).isEqualTo(wallet.getSum());
        assertThat(found.getUser().getId()).isEqualTo(user.getId());
    }

    private Order getOrder(User user, Site site, Transaction transaction) {
        Order order = new Order();
        order.setViewCount(100);
        order.setCreatedAt(LocalDateTime.now());
        order.setClosed(false);
        order.setUser(user);
        order.setSite(site);
        order.setTransaction(transaction);
        return order;
    }

    private Wallet getWallet(User user) {
        Wallet wallet = new Wallet();
        wallet.setSum(1000);
        wallet.setUser(user);
        return wallet;
    }

    private Transaction getTransaction(TransactionType type, Wallet wallet) {
        Transaction transaction = new Transaction();
        transaction.setDescription("Test Transaction");
        transaction.setType(type);
        transaction.setCreatedAt(LocalDateTime.now());
        transaction.setWallet(wallet);
        transaction.setSum(500);
        transaction.setCompleted(true);
        return transaction;
    }

    private Site getSite(User owner) {
        Site site = new Site();
        site.setName("My Site");
        site.setDescription("Description of my site");
        site.setUrl("http://mysite.com");
        site.setOwner(owner);
        site.setCreatedAt(LocalDateTime.now());
        return site;
    }

    private User getUser() {
        User user = new User();
        user.setName("Jane Doe");
        user.setEmail("jane.doe@example.com");
        user.setPassword("password");
        user.setRegisteredAt(LocalDateTime.now());
        return user;
    }

    private TransactionType getTransactionType() {
        TransactionType type = new TransactionType();
        type.setName("Credit");
        return type;
    }
}
