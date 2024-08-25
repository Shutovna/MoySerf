package ru.shutovna.moyserf.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.MessageSource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;
import ru.shutovna.moyserf.controller.UserSiteKey;
import ru.shutovna.moyserf.controller.ViewToken;
import ru.shutovna.moyserf.error.InvalidViewException;
import ru.shutovna.moyserf.error.SiteNotFoundException;
import ru.shutovna.moyserf.model.*;
import ru.shutovna.moyserf.repository.ViewRepository;

import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@Transactional
class ViewServiceIT {

    @Autowired
    private ViewService viewService;

    @MockBean
    private IUserService userService;

    @MockBean
    private ViewRepository viewRepository;

    @MockBean
    private ITransactionService transactionService;

    @MockBean
    private IPricingStrategyFactory pricingStrategyFactory;

    @MockBean
    private ISiteService siteService;

    @MockBean
    private IOrderService orderService;

    @MockBean
    private IWalletService walletService;

    @MockBean
    private MessageSource messageSource;

    private User testUser;
    private User systemUser;
    private Site testSite;
    private Wallet testWallet;
    private Order testOrder;
    private IPricingStrategy pricingStrategy;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setWallet(new Wallet());

        systemUser = new User();
        systemUser.setId(2L);
        systemUser.setWallet(new Wallet());

        testSite = new Site();
        testSite.setId(1L);
        testSite.setUrl("http://example.com");

        testWallet = new Wallet();
        testWallet.setId(1L);
        testWallet.setSum(100);

        pricingStrategy = mock(IPricingStrategy.class);
        when(pricingStrategyFactory.getPricingStrategy()).thenReturn(pricingStrategy);

        when(userService.getCurrentUser()).thenReturn(testUser);
        when(userService.getSystemUser()).thenReturn(systemUser);
        when(siteService.getSiteById(1L)).thenReturn(Optional.of(testSite));
        when(viewRepository.save(any(View.class))).thenAnswer(invocation -> invocation.getArgument(0));

        when(pricingStrategy.getUserSiteViewPrice()).thenReturn(10);
        when(pricingStrategy.getSystemSiteViewPrice()).thenReturn(5);
        when(pricingStrategy.getUserEarnedReferalSiteViewPrice()).thenReturn(2);
        when(pricingStrategy.getSiteViewTime()).thenReturn(30);
    }

    @Test
    void testCreateViewSuccess() {
        View view = viewService.create(1L);

        assertNotNull(view);
        assertEquals(testUser, view.getUser());
        assertEquals(testSite, view.getOrder().getSite());

        verify(transactionService, times(2)).createTransaction(any(TransactionType.class), anyString(), anyInt(), any(User.class));
        verify(walletService, times(2)).saveWallet(any(Wallet.class));
        verify(viewRepository, times(1)).save(view);
    }

    @Test
    void testStartView() {
        ViewToken viewToken = viewService.startView(1L);

        assertNotNull(viewToken);
        assertNotNull(viewToken.getToken());
        assertEquals(36, viewToken.getToken().length()); // UUID length

        UserSiteKey key = new UserSiteKey(testUser.getId(), testSite.getId());
        assertTrue(ViewService.map.containsKey(key));
        assertEquals(1, ViewService.map.get(key).size());
    }

    @Test
    void testEndViewSuccess() {
        ViewToken viewToken = viewService.startView(1L);
        assertDoesNotThrow(() -> viewService.endView(1L, viewToken.getToken()));
    }

    @Test
    void testEndViewFailureInvalidToken() {
        ViewToken viewToken = viewService.startView(1L);
        String invalidToken = UUID.randomUUID().toString();
        assertThrows(InvalidViewException.class, () -> viewService.endView(1L, invalidToken));
    }

    @Test
    void testEndViewFailureExpiredToken() {
        when(pricingStrategy.getSiteViewTime()).thenReturn(-1); // Simulate an expired token
        ViewToken viewToken = viewService.startView(1L);
        assertThrows(InvalidViewException.class, () -> viewService.endView(1L, viewToken.getToken()));
    }

    @Test
    void testCreateViewSiteNotFound() {
        when(siteService.getSiteById(anyLong())).thenReturn(Optional.empty());
        assertThrows(SiteNotFoundException.class, () -> viewService.create(999L));
    }
}
