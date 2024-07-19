package ru.shutovna.myserf;

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
        Person person = getPerson();

        Site site = getSite(person);

        TransactionType transactionType = getTransactionType();

        Wallet wallet = getWallet(person);

        Transaction transaction = getTransaction(transactionType, wallet);

        Order order = getOrder(person, site, transaction);

        entityManager.persist(person);
        entityManager.persist(site);
        entityManager.persist(wallet);
        entityManager.persist(transactionType);
        entityManager.persist(transaction);
        entityManager.persist(order);
        entityManager.flush();

        Order found = entityManager.find(Order.class, order.getId());
        assertThat(found).isNotNull();
        assertThat(found.getViewCount()).isEqualTo(order.getViewCount());
        assertThat(found.getPerson().getId()).isEqualTo(person.getId());
    }

    @Test
    public void testPersonEntity() {
        Person person = getPerson();

        entityManager.persist(person);
        entityManager.flush();

        Person found = entityManager.find(Person.class, person.getId());
        assertThat(found).isNotNull();
        assertThat(found.getName()).isEqualTo(person.getName());
    }



    @Test
    public void testSiteEntity() {
        Person owner = getPerson();

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

        Person person = getPerson();

        Wallet wallet = getWallet(person);

        Transaction transaction = getTransaction(type, wallet);

        entityManager.persist(type);
        entityManager.persist(person);
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
        Person person = getPerson();

        Site site = getSite(person);

        TransactionType transactionType = getTransactionType();

        Wallet wallet = getWallet(person);

        Transaction transaction = getTransaction(transactionType, wallet);

        View view = new View();
        view.setPerson(person);
        view.setSite(site);
        view.setViewedAt(LocalDateTime.now());
        view.setTransaction(transaction);

        entityManager.persist(person);
        entityManager.persist(site);
        entityManager.persist(wallet);
        entityManager.persist(transactionType);
        entityManager.persist(transaction);
        entityManager.persist(view);
        entityManager.flush();

        View found = entityManager.find(View.class, view.getId());
        assertThat(found).isNotNull();
        assertThat(found.getPerson().getId()).isEqualTo(person.getId());
        assertThat(found.getSite().getId()).isEqualTo(site.getId());
    }

    @Test
    public void testWalletEntity() {
        Person person = getPerson();

        Wallet wallet = getWallet(person);

        entityManager.persist(person);
        entityManager.persist(wallet);
        entityManager.flush();

        Wallet found = entityManager.find(Wallet.class, wallet.getId());
        assertThat(found).isNotNull();
        assertThat(found.getSum()).isEqualTo(wallet.getSum());
        assertThat(found.getPerson().getId()).isEqualTo(person.getId());
    }

    private Order getOrder(Person person, Site site, Transaction transaction) {
        Order order = new Order();
        order.setViewCount(100);
        order.setCreatedAt(LocalDateTime.now());
        order.setClosed(false);
        order.setPerson(person);
        order.setSite(site);
        order.setTransaction(transaction);
        return order;
    }

    private Wallet getWallet(Person person) {
        Wallet wallet = new Wallet();
        wallet.setSum(1000);
        wallet.setPerson(person);
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

    private Site getSite(Person owner) {
        Site site = new Site();
        site.setName("My Site");
        site.setDescription("Description of my site");
        site.setUrl("http://mysite.com");
        site.setOwner(owner);
        site.setCreatedAt(LocalDateTime.now());
        return site;
    }

    private Person getPerson() {
        Person person = new Person();
        person.setName("Jane Doe");
        person.setEmail("jane.doe@example.com");
        person.setPassword("password");
        person.setRegisteredAt(LocalDateTime.now());
        return person;
    }

    private TransactionType getTransactionType() {
        TransactionType type = new TransactionType();
        type.setName("Credit");
        return type;
    }
}
