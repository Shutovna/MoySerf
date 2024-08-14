package ru.shutovna.moyserf.controller;

import org.junit.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import ru.shutovna.moyserf.model.Site;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.model.Wallet;
import ru.shutovna.moyserf.payload.request.SiteRequest;
import ru.shutovna.moyserf.payload.response.ApiResponse;
import ru.shutovna.moyserf.payload.response.SiteListResponse;
import ru.shutovna.moyserf.repository.SiteRepository;
import ru.shutovna.moyserf.repository.UserRepository;
import ru.shutovna.moyserf.repository.WalletRepository;
import ru.shutovna.moyserf.service.SiteService;

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

    private HttpHeaders authHeaders;
    private User testUser;

    @BeforeEach
    public void setUp() {
        testUser = TestUtil.createTestUser(userRepository);
        String token = TestUtil.login(restTemplate);

        // Создаем заголовки, добавляем токен
        authHeaders = new HttpHeaders();
        authHeaders.set("Authorization", "Bearer " + token);
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
        assertThat(updatedSite.getUrl()).isEqualTo("link");
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