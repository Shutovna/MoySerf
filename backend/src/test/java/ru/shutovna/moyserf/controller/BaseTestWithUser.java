package ru.shutovna.moyserf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.test.context.ActiveProfiles;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.model.Wallet;
import ru.shutovna.moyserf.repository.UserRepository;
import ru.shutovna.moyserf.repository.WalletRepository;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class BaseTestWithUser {
    @Autowired
    protected TestRestTemplate restTemplate;

    @Autowired
    protected WalletRepository walletRepository;
    @Autowired
    protected UserRepository userRepository;
    protected HttpHeaders authHeaders;
    protected User testUser;
    protected Wallet testWallet;

    protected void initAndLogin() {
        testUser = TestUtil.createTestUser(TestUtil.TEST_USER_EMAIL, TestUtil.TEST_USER_PASSWORD);
        userRepository.save(testUser);

        testWallet = TestUtil.createWallet(testUser);
        walletRepository.save(this.testWallet);

        authHeaders = TestUtil.login(restTemplate, TestUtil.TEST_USER_EMAIL, TestUtil.TEST_USER_PASSWORD);
    }
}
