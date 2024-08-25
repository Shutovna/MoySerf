package ru.shutovna.moyserf.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import ru.shutovna.moyserf.error.NotEnoughMoneyException;
import ru.shutovna.moyserf.error.SiteNotFoundException;
import ru.shutovna.moyserf.error.UnauthorizedException;
import ru.shutovna.moyserf.model.*;
import ru.shutovna.moyserf.payload.request.OrderRequest;
import ru.shutovna.moyserf.repository.OrderRepository;

import java.util.Locale;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private ISiteService siteService;

    @Mock
    private IUserService userService;

    @Mock
    private ITransactionService transactionService;

    @Mock
    private IWalletService walletService;

    @Mock
    private IPricingStrategyFactory pricingStrategyFactory;

    @Mock
    private MessageSource messages;

    @InjectMocks
    private OrderService orderService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        LocaleContextHolder.setLocale(Locale.ENGLISH);
    }

    @Test
    void testCreateOrder_Success() {
        // Arrange
        User mockUser = new User();
        Wallet mockWallet = new Wallet();
        mockWallet.setSum(1000*100);
        mockUser.setWallet(mockWallet);

        Site mockSite = new Site();
        mockSite.setName("Test Site");
        mockSite.setOwner(mockUser);

        OrderRequest orderRequest = new OrderRequest();
        orderRequest.setSiteId(1L);
        orderRequest.setViewCount(100);

        when(userService.getCurrentUser()).thenReturn(mockUser);
        when(siteService.getSiteById(orderRequest.getSiteId())).thenReturn(Optional.of(mockSite));
        when(messages.getMessage(anyString(), any(), any(Locale.class))).thenReturn("Test Transaction Description");
        when(pricingStrategyFactory.getPricingStrategy()).thenReturn(new SimplePricingStrategy());

        Transaction mockTransaction = new Transaction();
        when(transactionService.createTransaction(any(), anyString(), anyLong(), mockUser)).thenReturn(mockTransaction);
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        Order createdOrder = orderService.createOrder(orderRequest);

        // Assert
        assertNotNull(createdOrder);
        assertEquals(mockSite, createdOrder.getSite());
        assertEquals(100, createdOrder.getViewCount());
        assertEquals(mockTransaction, createdOrder.getTransaction());

        verify(walletService).saveWallet(mockWallet);
        assertEquals(976*100, mockWallet.getSum());
    }

    @Test
    void testCreateOrder_SiteNotFound() {
        // Arrange
        OrderRequest orderRequest = new OrderRequest();
        orderRequest.setSiteId(1L);

        when(siteService.getSiteById(orderRequest.getSiteId())).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(SiteNotFoundException.class, () -> orderService.createOrder(orderRequest));
    }

    @Test
    void testCreateOrder_UserIsNotOwner() {
        // Arrange
        User mockUser = new User();
        mockUser.setName("Test User");
        User siteOwner = new User();
        siteOwner.setName("Test Site Owner");

        Wallet mockWallet = new Wallet();
        mockWallet.setSum(1000*100);
        mockUser.setWallet(mockWallet);

        Site mockSite = new Site();
        mockSite.setName("Test Site");
        mockSite.setOwner(siteOwner);

        OrderRequest orderRequest = new OrderRequest();
        orderRequest.setSiteId(1L);
        orderRequest.setViewCount(100);

        when(userService.getCurrentUser()).thenReturn(mockUser);
        when(siteService.getSiteById(orderRequest.getSiteId())).thenReturn(Optional.of(mockSite));
        when(messages.getMessage(anyString(), any(), any(Locale.class))).thenReturn("Test Transaction Description");
        when(pricingStrategyFactory.getPricingStrategy()).thenReturn(new SimplePricingStrategy());

        Transaction mockTransaction = new Transaction();
        when(transactionService.createTransaction(any(), anyString(), anyLong(), mockUser)).thenReturn(mockTransaction);
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        assertThrows(UnauthorizedException.class, () -> orderService.createOrder(orderRequest));
    }

    @Test
    void testCreateOrder_NotEnoughMoney() {
        // Arrange
        User mockUser = new User();
        Wallet mockWallet = new Wallet();
        mockWallet.setSum(100 * 100L); // Недостаточно денег
        mockUser.setWallet(mockWallet);

        Site mockSite = new Site();
        mockSite.setOwner(mockUser);

        OrderRequest orderRequest = new OrderRequest();
        orderRequest.setSiteId(1L);
        orderRequest.setViewCount(417);

        when(userService.getCurrentUser()).thenReturn(mockUser);
        when(siteService.getSiteById(orderRequest.getSiteId())).thenReturn(Optional.of(mockSite));
        when(pricingStrategyFactory.getPricingStrategy()).thenReturn(new SimplePricingStrategy());

        // Act & Assert
        assertThrows(NotEnoughMoneyException.class, () -> orderService.createOrder(orderRequest));
    }
}
