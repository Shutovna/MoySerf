package ru.shutovna.moyserf.controller;

import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import ru.shutovna.moyserf.model.AuthProvider;
import ru.shutovna.moyserf.model.Site;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.model.Wallet;
import ru.shutovna.moyserf.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class TestUtil {

    public static final String TEST_USER_EMAIL = "TestUser@email.com";
    public static final String TEST_USER_PASSWORD = "password";

    public static String login(TestRestTemplate restTemplate) {
        // Создаем тело запроса с логином и паролем
        Map<String, String> loginBody = new HashMap<>();
        loginBody.put("email", TEST_USER_EMAIL);
        loginBody.put("password", TEST_USER_PASSWORD);

        // Создаем заголовки для запроса
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Создаем объект HttpEntity для запроса
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(loginBody, headers);

        // Выполняем запрос POST и получаем ответ
        ResponseEntity<Map> response = restTemplate.exchange("/api/auth/signin", HttpMethod.POST, entity, Map.class);

        // Извлекаем токен из ответа
        return (String) response.getBody().get("accessToken");
    }

    public static User createTestUser(UserRepository userRepository) {
        User user = new User();
        user.setName(TEST_USER_EMAIL);
        user.setPassword(new BCryptPasswordEncoder().encode(TEST_USER_PASSWORD));
        user.setEmail(TEST_USER_EMAIL);
        user.setCreatedAt(LocalDateTime.now());
        user.setEmailVerified(true);
        user.setImageUrl("http://www.google.com");
        user.setProvider(AuthProvider.local);
        return userRepository.save(user);
    }

    public static User createUser(int diff) {
        User user = new User();
        user.setName("TestUser" + diff);
        user.setPassword("password");
        user.setEmail("TestUser" +  + diff + "@email.com");
        user.setCreatedAt(LocalDateTime.now());
        user.setEmailVerified(true);
        user.setImageUrl("http://www.google.com");
        user.setProvider(AuthProvider.local);
        return user;
    }

    public static Wallet createWallet() {
        Wallet wallet = new Wallet();
        wallet.setSum(1000 * 100);
        return wallet;
    }

    public static Site createSite(int diff) {
        Site site = new Site();
        site.setName("TestSite" + diff);
        site.setDescription("TestDescription" + diff);
        site.setUrl("http://www.google.com/site" + diff);
        site.setCreatedAt(LocalDateTime.now());
        site.setAvatarUrl("http://www.google.com");
        return site;
    }
}
