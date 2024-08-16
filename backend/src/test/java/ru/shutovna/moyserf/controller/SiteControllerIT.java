package ru.shutovna.moyserf.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import ru.shutovna.moyserf.model.*;
import ru.shutovna.moyserf.payload.request.SiteRequest;
import ru.shutovna.moyserf.payload.response.ApiResponse;
import ru.shutovna.moyserf.payload.response.SiteListResponse;
import ru.shutovna.moyserf.payload.response.SiteResponse;
import ru.shutovna.moyserf.repository.*;
import ru.shutovna.moyserf.service.SimplePricingStrategy;
import ru.shutovna.moyserf.service.SiteService;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@Sql("classpath:scripts/delete_all_data.sql")
public class SiteControllerIT {

    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private SiteService siteService;

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    private HttpHeaders authHeaders;
    private User testUser;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private ViewRepository viewRepository;

    @BeforeEach
    public void setUp() {
        if (testUser == null) {
            testUser = TestUtil.createTestUser(userRepository, TestUtil.TEST_USER_EMAIL, TestUtil.TEST_USER_PASSWORD);
            authHeaders = TestUtil.login(restTemplate, TestUtil.TEST_USER_EMAIL, TestUtil.TEST_USER_PASSWORD);
        }
    }

    @Test
    public void testGetAllSites() {
        // Создаем и сохраняем тестовые данные
        User siteOwner = TestUtil.createUser(1);
        Wallet wallet = TestUtil.createWallet();
        wallet.setUser(siteOwner);

        userRepository.save(siteOwner);
        walletRepository.save(wallet);

        Site site = TestUtil.createSite(1);
        Site site2 = TestUtil.createSite(2);
        Site site3 = TestUtil.createSite(3);
        site.setOwner(siteOwner);
        site2.setOwner(siteOwner);
        site3.setOwner(siteOwner);
        siteRepository.save(site);
        siteRepository.save(site2);
        siteRepository.save(site3);

        // Создаем объект HttpEntity с заголовками
        HttpEntity<String> entity = new HttpEntity<>(authHeaders);

        // Отправляем GET-запрос
        ResponseEntity<SiteListResponse> response = restTemplate.exchange("/api/sites", HttpMethod.GET, entity, SiteListResponse.class);

        // Проверяем статус ответа и наличие данных
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        SiteListResponse body = response.getBody();
        assertThat(body.getSites().size()).isEqualTo(3);
    }

    @Test
    public void testGetMySites() {
        // Создаем и сохраняем тестовые данные
        User siteOwner = testUser;
        User siteOwner2 = userRepository.save(TestUtil.createUser(2));

        Wallet wallet = TestUtil.createWallet();
        wallet.setUser(siteOwner);
        Wallet wallet2 = TestUtil.createWallet();
        wallet2.setUser(siteOwner2);
        walletRepository.save(wallet);
        walletRepository.save(wallet2);

        Site site = TestUtil.createSite(1);
        Site site2 = TestUtil.createSite(2);
        Site site3 = TestUtil.createSite(3);
        site.setOwner(siteOwner);
        site2.setOwner(siteOwner2);
        site3.setOwner(siteOwner);
        siteRepository.save(site);
        siteRepository.save(site2);
        siteRepository.save(site3);

        // Создаем объект HttpEntity с заголовками
        HttpEntity<String> entity = new HttpEntity<>(authHeaders);

        // Отправляем GET-запрос
        ResponseEntity<SiteListResponse> response = restTemplate.exchange("/api/sites/my", HttpMethod.GET, entity, SiteListResponse.class);

        // Проверяем статус ответа и наличие данных
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        SiteListResponse body = response.getBody();
        assertThat(body.getSites().size()).isEqualTo(2);
    }

    @Test
    public void testGetSitesOpenedForView() {
        User siteOwner = testUser;

        Site site = TestUtil.createSite(1);
        Site site2 = TestUtil.createSite(2);
        Site site3 = TestUtil.createSite(3);
        site.setOwner(siteOwner);
        site2.setOwner(siteOwner);
        site3.setOwner(siteOwner);
        siteRepository.save(site);
        siteRepository.save(site2);
        siteRepository.save(site3);

        Order o = createOrder(site, 100);
        Transaction transaction = createTransaction(siteOwner, 100 * new SimplePricingStrategy().getSiteViewPrice(), TransactionType.ORDER_SITE_VIEW);
        o.setTransaction(transaction);
        transactionRepository.save(transaction);
        orderRepository.save(o);

        Order o2 = createOrder(site2, 1000);
        Transaction transaction2 = createTransaction(siteOwner, 1000 * new SimplePricingStrategy().getSiteViewPrice(), TransactionType.ORDER_SITE_VIEW);
        o2.setTransaction(transaction2);
        transactionRepository.save(transaction2);
        orderRepository.save(o2);

        Order o3 = createOrder(site3, 1000);
        o3.setClosed(true);
        Transaction transaction3 = createTransaction(siteOwner, 1000 * new SimplePricingStrategy().getSiteViewPrice(), TransactionType.ORDER_SITE_VIEW);
        o3.setTransaction(transaction3);
        transactionRepository.save(transaction3);
        orderRepository.save(o3);

        // Создаем объект HttpEntity с заголовками
        HttpEntity<String> entity = new HttpEntity<>(authHeaders);

        // Отправляем GET-запрос
        ResponseEntity<SiteListResponse> response = restTemplate.exchange("/api/sites/forView", HttpMethod.GET, entity, SiteListResponse.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        SiteListResponse body = response.getBody();
        List<SiteResponse> sites = body.getSites();
        assertThat(sites.size()).isEqualTo(2);
        assertThat(sites.get(0).getUrl()).isEqualTo(site.getUrl());
        assertThat(sites.get(1).getUrl()).isEqualTo(site2.getUrl());
    }

    @Test
    public void testGetSitesOpenedForView_withAlreadyViewed() {
        User siteOwner = testUser;
        User viewer = TestUtil.createUser(1);
        User viewer2 = TestUtil.createUser(2);
        userRepository.save(viewer);
        userRepository.save(viewer2);
        

        Site site = TestUtil.createSite(1);
        Site site2 = TestUtil.createSite(2);
        site.setOwner(siteOwner);
        site2.setOwner(siteOwner);
        siteRepository.save(site);
        siteRepository.save(site2);

        Order o = createOrder(site, 100);
        Transaction transaction = createTransaction(siteOwner, 100 * new SimplePricingStrategy().getSiteViewPrice(), TransactionType.ORDER_SITE_VIEW);
        o.setTransaction(transaction);
        transactionRepository.save(transaction);
        orderRepository.save(o);

        Order o2 = createOrder(site2, 1000);
        Transaction transaction2 = createTransaction(siteOwner, 1000 * new SimplePricingStrategy().getSiteViewPrice(), TransactionType.ORDER_SITE_VIEW);
        o2.setTransaction(transaction2);
        transactionRepository.save(transaction2);
        orderRepository.save(o2);

        View view = new View();
        view.setViewedAt(LocalDateTime.now().minusHours(2));
        view.setOrder(o2);
        view.setUser(viewer);        
        Transaction transactionView = createTransaction(siteOwner, 100 * new SimplePricingStrategy().getSiteViewPrice(), TransactionType.USER_EARNED_SITE_VIEW);
        view.setTransaction(transactionView);
        transactionRepository.save(transactionView);
        viewRepository.save(view);

        // Создаем объект HttpEntity с заголовками
        authHeaders = TestUtil.login(restTemplate, viewer.getEmail(), TestUtil.TEST_USER_PASSWORD);
        HttpEntity<String> entity = new HttpEntity<>(authHeaders);

        // Отправляем GET-запрос
        ResponseEntity<SiteListResponse> response = restTemplate.exchange("/api/sites/forView", HttpMethod.GET, entity, SiteListResponse.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        SiteListResponse body = response.getBody();
        List<SiteResponse> sites = body.getSites();
        assertThat(sites.size()).isEqualTo(1);
        assertThat(sites.get(0).getUrl()).isEqualTo(site.getUrl());

        authHeaders = TestUtil.login(restTemplate, viewer2.getEmail(), TestUtil.TEST_USER_PASSWORD);
        entity = new HttpEntity<>(authHeaders);

        // Отправляем GET-запрос
        response = restTemplate.exchange("/api/sites/forView", HttpMethod.GET, entity, SiteListResponse.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        body = response.getBody();
        sites = body.getSites();
        assertThat(sites.size()).isEqualTo(2);
        assertThat(sites.get(0).getUrl()).isEqualTo(site.getUrl());
        assertThat(sites.get(1).getUrl()).isEqualTo(site2.getUrl());
    }

    private static Transaction createTransaction(User user, long sum, TransactionType transactionType) {
        Transaction transaction = new Transaction();
        transaction.setType(transactionType);
        transaction.setCompleted(false);
        transaction.setSum(sum);
        transaction.setUser(user);
        transaction.setCreatedAt(LocalDateTime.now());
        return transaction;
    }

    private static Order createOrder(Site site, int viewCount) {
        Order o = new Order();
        o.setSite(site);
        o.setViewCount(viewCount);
        o.setCreatedAt(LocalDateTime.now());
        o.setClosed(false);
        o.setUser(site.getOwner());
        return o;
    }

    @Test
    public void testAddSite() {
        // Создаем запрос для добавления сайта
        SiteRequest siteRequest = new SiteRequest("New Site", "Description", "http://newsite.com", null);

        // Отправляем POST-запрос
        HttpEntity<SiteRequest> entity = new HttpEntity<SiteRequest>(siteRequest, authHeaders);
        ResponseEntity<ApiResponse> response = restTemplate.exchange("/api/sites", HttpMethod.POST, entity, ApiResponse.class);

        // Проверяем статус ответа и сообщение
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        ApiResponse body = response.getBody();
        assertThat(body).isNotNull();
        assertThat(body.isSuccess());
        assertThat(body.getMessage()).isEqualTo("Site registered successfully");

        // Проверяем, что сайт был добавлен в базу данных
        List<Site> sites = siteRepository.findAll();
        assertThat(sites.size()).isEqualTo(1);
        Site site = sites.get(0);
        assertThat(response.getHeaders().getLocation().getPath()).isEqualTo("/api/sites/" + site.getId());
        assertThat(site.getOwner()).isEqualTo(testUser);
        assertThat(site.getName()).isEqualTo("New Site");
    }

    @Test
    public void testUpdateSite() {
        // Создаем и сохраняем тестовый сайт
        Site site = TestUtil.createSite(1);
        site.setOwner(testUser);
        site = siteRepository.save(site);

        // Создаем запрос для обновления сайта
        SiteRequest siteRequest = new SiteRequest("Updated Site", "Updated Description", "http://updatedsite.com", "link");

        // Отправляем PUT-запрос
        HttpEntity<SiteRequest> entity = new HttpEntity<>(siteRequest, authHeaders);
        ResponseEntity<ApiResponse> response = restTemplate.exchange("/api/sites/" + site.getId(), HttpMethod.PUT, entity, ApiResponse.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getMessage()).isEqualTo("Site updated successfully");


        // Проверяем, что сайт был обновлен в базе данных
        Site updatedSite = siteRepository.findById(site.getId()).orElseThrow();
        assertThat(updatedSite.getName()).isEqualTo("Updated Site");
        assertThat(updatedSite.getDescription()).isEqualTo("Updated Description");
        assertThat(updatedSite.getUrl()).isEqualTo("http://updatedsite.com");
        assertThat(updatedSite.getAvatarUrl()).isEqualTo("link");
    }

    @Test
    public void testUpdateNonExistentSite() {
        // Создаем запрос для обновления несуществующего сайта
        SiteRequest siteRequest = new SiteRequest("Updated Site", "Updated Description", "http://updatedsite.com", "link");

        HttpEntity<SiteRequest> entity = new HttpEntity<>(siteRequest, authHeaders);
        // Отправляем PUT-запрос на несуществующий сайт
        ResponseEntity<Void> response = restTemplate.exchange("/api/sites/999",
                HttpMethod.PUT,
                entity,
                Void.class);

        // Проверяем, что сайт не найден
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }
}