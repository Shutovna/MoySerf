package ru.shutovna.moyserf.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import ru.shutovna.moyserf.model.*;
import ru.shutovna.moyserf.payload.request.OrderRequest;
import ru.shutovna.moyserf.payload.response.ApiResponse;
import ru.shutovna.moyserf.repository.OrderRepository;
import ru.shutovna.moyserf.repository.SiteRepository;
import ru.shutovna.moyserf.repository.TransactionRepository;
import ru.shutovna.moyserf.service.IPricingStrategy;
import ru.shutovna.moyserf.service.IPricingStrategyFactory;
import ru.shutovna.moyserf.service.ViewServiceUtil;
import ru.shutovna.moyserf.util.Constants;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@Sql({"classpath:scripts/delete_all_data.sql", "classpath:data.sql"})
public class ViewControllerIT extends BaseTestWithUser {
    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private IPricingStrategyFactory pricingStrategyFactory;

    @Autowired
    private TransactionRepository transactionRepository;

    @BeforeEach
    public void setUp() {
        if (testUser == null) {
            initAndLogin();
        }
    }

    @Test
    public void testView() {
        User siteOwner = testUser;

        Site site = TestUtil.createSite(1);
        site.setOwner(siteOwner);
        siteRepository.save(site);

        Transaction orderTransaction = new Transaction();
        orderTransaction.setSum(2000L * getPricingStrategy().getSiteViewPrice());
        orderTransaction.setDescription("desc");
        orderTransaction.setType(TransactionType.ORDER_SITE_VIEW);
        orderTransaction.setUser(siteOwner);
        orderTransaction.setCreatedAt(LocalDateTime.now());
        transactionRepository.save(orderTransaction);

        Order order = new Order();
        order.setViewCount(2000);
        order.setSite(site);
        order.setUser(siteOwner);
        order.setCreatedAt(LocalDateTime.now());
        order.setClosed(false);
        order.setTransaction(orderTransaction);
        orderRepository.save(order);

        // Отправляем POST-запрос
        HttpEntity<OrderRequest> entity = new HttpEntity<>(null, authHeaders);
        ResponseEntity<ApiResponse> response = restTemplate.exchange("/api/views/start-view?siteId=" + site.getId(),
                HttpMethod.GET, entity, ApiResponse.class);

        // Проверяем статус ответа и сообщение
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        ApiResponse body = response.getBody();
        assert body != null;
        String token = body.getMessage();
        assertThat(body).isNotNull();
        assertThat(body.isSuccess()).isEqualTo(true);


        List<Order> orders = orderRepository.findAll();
        assertThat(orders.size()).isEqualTo(1);

        ViewServiceUtil.viewTokenMinusViewTime(siteOwner, site, getPricingStrategy().getSiteViewTime());

        entity = new HttpEntity<>(null, authHeaders);
        restTemplate.exchange(String.format("/api/views/end-view?siteId=%d&token=%s", site.getId(), token),
                HttpMethod.GET, entity, ApiResponse.class);

        List<Transaction> transactions = transactionRepository.findAll();
        assertThat(transactions.size()).isEqualTo(3);

        Transaction dbOrderTransaction = transactions.get(0);
        assertThat(dbOrderTransaction.getType()).isEqualTo(TransactionType.ORDER_SITE_VIEW);
        assertThat(dbOrderTransaction.getUser()).isEqualTo(testUser);
        assertThat(dbOrderTransaction.getSum()).isEqualTo(2000L * getPricingStrategy().getSiteViewPrice());

        Transaction dbUserTransaction = transactions.get(1);
        assertThat(dbUserTransaction.getType()).isEqualTo(TransactionType.USER_EARNED_SITE_VIEW);
        assertThat(dbUserTransaction.getSum()).isEqualTo(getPricingStrategy().getUserSiteViewPrice());

        Transaction dbSystemTransaction = transactions.get(2);
        assertThat(dbSystemTransaction.getType()).isEqualTo(TransactionType.SYSTEM_EARENED_SITE_VIEW);
        assertThat(dbSystemTransaction.getSum()).isEqualTo(getPricingStrategy().getSystemSiteViewPrice());


        testWallet = walletRepository.findById(testWallet.getId()).orElseThrow();
        assertThat(testWallet.getSum()).isEqualTo(1000 * 100 + getPricingStrategy().getUserSiteViewPrice());

        User systemUser = userRepository.findById(Constants.SYSTEM_USER_ID).orElseThrow();
        Wallet systemWallet = systemUser.getWallet();
        assertThat(systemWallet.getSum()).isEqualTo(getPricingStrategy().getSystemSiteViewPrice());

    }

    private IPricingStrategy getPricingStrategy() {
        return pricingStrategyFactory.getPricingStrategy();
    }

    @Test
    public void testViewWithReferal() {
        User siteOwner = testUser;

        User systemUser = userRepository.findById(Constants.SYSTEM_USER_ID).orElseThrow();

        User referalUser = TestUtil.createUser(2);
        referalUser.setInvitor(siteOwner);
        referalUser = userRepository.save(referalUser);

        Wallet referalWallet = TestUtil.createWallet(referalUser);
        referalWallet = walletRepository.save(referalWallet);

        Site site = TestUtil.createSite(1);
        site.setOwner(siteOwner);
        siteRepository.save(site);

        Transaction orderTransaction = new Transaction();
        IPricingStrategy pricingStrategy = getPricingStrategy();
        orderTransaction.setSum(2000L * pricingStrategy.getSiteViewPrice());
        orderTransaction.setDescription("desc");
        orderTransaction.setType(TransactionType.ORDER_SITE_VIEW);
        orderTransaction.setUser(siteOwner);
        orderTransaction.setCreatedAt(LocalDateTime.now());
        transactionRepository.save(orderTransaction);

        Order order = new Order();
        order.setViewCount(2000);
        order.setSite(site);
        order.setUser(siteOwner);
        order.setCreatedAt(LocalDateTime.now());
        order.setClosed(false);
        order.setTransaction(orderTransaction);
        orderRepository.save(order);

        authHeaders = TestUtil.login(restTemplate, referalUser.getEmail(), TestUtil.TEST_USER_PASSWORD);
        HttpEntity<OrderRequest> entity = new HttpEntity<>(authHeaders);

        // Отправляем POST-запрос
        ResponseEntity<ApiResponse> response = restTemplate.exchange("/api/views/start-view?siteId=" + site.getId(),
                HttpMethod.GET, entity, ApiResponse.class);

        // Проверяем статус ответа и сообщение
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        ApiResponse body = response.getBody();
        assert body != null;
        String token = body.getMessage();
        assertThat(body).isNotNull();
        assertThat(body.isSuccess()).isEqualTo(true);


        List<Order> orders = orderRepository.findAll();
        assertThat(orders.size()).isEqualTo(1);

        ViewServiceUtil.viewTokenMinusViewTime(referalUser, site, getPricingStrategy().getSiteViewTime());

        entity = new HttpEntity<>(null, authHeaders);
        restTemplate.exchange(String.format("/api/views/end-view?siteId=%d&token=%s", site.getId(), token),
                HttpMethod.GET, entity, ApiResponse.class);

        List<Transaction> transactions = transactionRepository.findAll();
        assertThat(transactions.size()).isEqualTo(4);

        Transaction dbOrderTransaction = transactions.get(0);
        assertThat(dbOrderTransaction.getType()).isEqualTo(TransactionType.ORDER_SITE_VIEW);
        assertThat(dbOrderTransaction.getUser()).isEqualTo(testUser);
        assertThat(dbOrderTransaction.getSum()).isEqualTo(2000L * pricingStrategy.getSiteViewPrice());

        Transaction dbInvitorTransaction = transactions.get(1);
        assertThat(dbInvitorTransaction.getType()).isEqualTo(TransactionType.USER_EARNED_REFERAL_SITE_VIEW);
        assertThat(dbInvitorTransaction.getUser()).isEqualTo(testUser);
        assertThat(dbInvitorTransaction.getSum()).isEqualTo(pricingStrategy.getUserEarnedReferalSiteViewPrice());

        Transaction dbUserTransaction = transactions.get(2);
        assertThat(dbUserTransaction.getType()).isEqualTo(TransactionType.USER_EARNED_SITE_VIEW);
        assertThat(dbUserTransaction.getUser()).isEqualTo(referalUser);
        assertThat(dbUserTransaction.getSum()).isEqualTo(pricingStrategy.getUserSiteViewPrice());

        Transaction dbSystemTransaction = transactions.get(3);
        assertThat(dbSystemTransaction.getType()).isEqualTo(TransactionType.SYSTEM_EARENED_SITE_VIEW);
        assertThat(dbSystemTransaction.getUser()).isEqualTo(systemUser);
        assertThat(dbSystemTransaction.getSum()).isEqualTo(
                pricingStrategy.getSystemSiteViewPrice() -
                        pricingStrategy.getUserEarnedReferalSiteViewPrice());


        testWallet = walletRepository.findById(testWallet.getId()).orElseThrow();
        assertThat(testWallet.getSum()).isEqualTo(1000 * 100 + pricingStrategy.getUserEarnedReferalSiteViewPrice());

        referalWallet = walletRepository.findById(referalWallet.getId()).orElseThrow();
        assertThat(referalWallet.getSum()).isEqualTo(1000 * 100 + pricingStrategy.getUserSiteViewPrice());

        systemUser = userRepository.findById(Constants.SYSTEM_USER_ID).orElseThrow();
        Wallet systemWallet = systemUser.getWallet();
        assertThat(systemWallet.getSum()).isEqualTo(pricingStrategy.getSystemSiteViewPrice() -
                pricingStrategy.getUserEarnedReferalSiteViewPrice());

    }
}

