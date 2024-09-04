package ru.shutovna.moyserf.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
public class StatisticControllerIT extends BaseTestWithUser {
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
        IPricingStrategy pricingStrategy = pricingStrategyFactory.getPricingStrategy();
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
        String token = body.getMessage();
        assertThat(body).isNotNull();
        assertThat(body.isSuccess()).isEqualTo(true);


        List<Order> orders = orderRepository.findAll();
        assertThat(orders.size()).isEqualTo(1);

        ViewServiceUtil.viewTokenMinusViewTime(referalUser, site, getPricingStrategy().getSiteViewTime());

        entity = new HttpEntity<>(null, authHeaders);
        response = restTemplate.exchange(String.format("/api/views/end-view?siteId=%d&token=%s", site.getId(), token),
                HttpMethod.GET, entity, ApiResponse.class);
    }

    private IPricingStrategy getPricingStrategy() {
        return pricingStrategyFactory.getPricingStrategy();
    }

    @Test
    public void testGetAdvertisersCount() {
        HttpEntity<OrderRequest> entity = new HttpEntity<>(null, authHeaders);
        ResponseEntity<Integer> response = restTemplate.exchange(String.format("/api/stats/advertisersCount"),
                HttpMethod.GET, entity, Integer.class);
        assertThat(response.getBody()).isEqualTo(1);
    }

    @Test
    public void testGetWorkersCount() {
        HttpEntity<OrderRequest> entity = new HttpEntity<>(null, authHeaders);
        ResponseEntity<Integer> response = restTemplate.exchange(String.format("/api/stats/workersCount"),
                HttpMethod.GET, entity, Integer.class);
        assertThat(response.getBody()).isEqualTo(2);
    }

    @Test
    public void testGetTotalIncome() {
        HttpEntity<OrderRequest> entity = new HttpEntity<>(null, authHeaders);
        ResponseEntity<Long> response = restTemplate.exchange(String.format("/api/stats/totalIncome"),
                HttpMethod.GET, entity, Long.class);
        assertThat(response.getBody()).isEqualTo(21L);
    }

    @Test
    public void testGetTotalReferalsIncome() {
        HttpEntity<OrderRequest> entity = new HttpEntity<>(null, authHeaders);
        ResponseEntity<Long> response = restTemplate.exchange(String.format("/api/stats/totalReferalsIncome"),
                HttpMethod.GET, entity, Long.class);
        assertThat(response.getBody()).isEqualTo(1L);
    }

    @Test
    public void testGetUserViewCount() {
        HttpEntity<OrderRequest> entity = new HttpEntity<>(null, authHeaders);
        ResponseEntity<Integer> response = restTemplate.exchange(String.format("/api/stats/userViewCount"),
                HttpMethod.GET, entity, Integer.class);
        assertThat(response.getBody()).isEqualTo(1);
    }

    @Test
    public void testGetUserEarned() {
        HttpEntity<OrderRequest> entity = new HttpEntity<>(null, authHeaders);
        ResponseEntity<Long> response = restTemplate.exchange(String.format("/api/stats/userEarned"),
                HttpMethod.GET, entity, Long.class);
        assertThat(response.getBody()).isEqualTo(20L);
    }

    @Test
    public void testGetUserEarnedByReferals() {
        HttpEntity<OrderRequest> entity = new HttpEntity<>(null, authHeaders);
        ResponseEntity<Long> response = restTemplate.exchange(String.format("/api/stats/userEarnedByReferals"),
                HttpMethod.GET, entity, Long.class);
        assertThat(response.getBody()).isEqualTo(0L);
    }

    @Test
    public void testGetUserEarnedByReferals_Earned() {
        authHeaders = TestUtil.login(restTemplate, testUser.getEmail(), TestUtil.TEST_USER_PASSWORD);
        HttpEntity<OrderRequest> entity = new HttpEntity<>(null, authHeaders);
        ResponseEntity<Long> response = restTemplate.exchange(String.format("/api/stats/userEarnedByReferals"),
                HttpMethod.GET, entity, Long.class);
        assertThat(response.getBody()).isEqualTo(1L);
    }

    @Test
    public void testGetMyReferalsCount_noReferals() {
        HttpEntity<OrderRequest> entity = new HttpEntity<>(null, authHeaders);
        ResponseEntity<Integer> response = restTemplate.exchange(String.format("/api/stats/myReferalsCount"),
                HttpMethod.GET, entity, Integer.class);
        assertThat(response.getBody()).isEqualTo(0);
    }

    @Test
    public void testGetMyReferalsCount_hasReferals() {
        authHeaders = TestUtil.login(restTemplate, testUser.getEmail(), TestUtil.TEST_USER_PASSWORD);
        HttpEntity<OrderRequest> entity = new HttpEntity<>(null, authHeaders);
        ResponseEntity<Integer> response = restTemplate.exchange(String.format("/api/stats/myReferalsCount"),
                HttpMethod.GET, entity, Integer.class);
        assertThat(response.getBody()).isEqualTo(1);
    }

    @Test
    public void testGetMyReferalsIncome_noReferals() {
        HttpEntity<OrderRequest> entity = new HttpEntity<>(null, authHeaders);
        ResponseEntity<Long> response = restTemplate.exchange(String.format("/api/stats/myReferalsIncome"),
                HttpMethod.GET, entity, Long.class);
        assertThat(response.getBody()).isEqualTo(0L);
    }

    @Test
    public void testGetMyReferalsIncome_hasReferals() {
        authHeaders = TestUtil.login(restTemplate, testUser.getEmail(), TestUtil.TEST_USER_PASSWORD);
        HttpEntity<OrderRequest> entity = new HttpEntity<>(null, authHeaders);
        ResponseEntity<Long> response = restTemplate.exchange(String.format("/api/stats/myReferalsIncome"),
                HttpMethod.GET, entity, Long.class);
        assertThat(response.getBody()).isEqualTo(20L);
    }

    @Test
    public void testGetMyReferalsViewCount_noReferals() {
        HttpEntity<OrderRequest> entity = new HttpEntity<>(null, authHeaders);
        ResponseEntity<Integer> response = restTemplate.exchange(String.format("/api/stats/myReferalsVieewCount"),
                HttpMethod.GET, entity, Integer.class);
        assertThat(response.getBody()).isEqualTo(0);
    }

    @Test
    public void testGetMyReferalsViewCount_hasReferals() {
        authHeaders = TestUtil.login(restTemplate, testUser.getEmail(), TestUtil.TEST_USER_PASSWORD);
        HttpEntity<OrderRequest> entity = new HttpEntity<>(null, authHeaders);
        ResponseEntity<Integer> response = restTemplate.exchange(String.format("/api/stats/myReferalsVieewCount"),
                HttpMethod.GET, entity, Integer.class);
        assertThat(response.getBody()).isEqualTo(1);
    }

}
