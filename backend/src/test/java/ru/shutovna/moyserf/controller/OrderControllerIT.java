package ru.shutovna.moyserf.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import ru.shutovna.moyserf.model.*;
import ru.shutovna.moyserf.payload.request.OrderRequest;
import ru.shutovna.moyserf.payload.response.ApiResponse;
import ru.shutovna.moyserf.repository.OrderRepository;
import ru.shutovna.moyserf.repository.SiteRepository;
import ru.shutovna.moyserf.service.IPricingStrategyFactory;

import java.util.List;
import java.util.Locale;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@Sql("classpath:scripts/delete_all_data.sql")
public class OrderControllerIT extends BaseTestWithUser{
    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private IPricingStrategyFactory pricingStrategyFactory;

    @Autowired
    private MessageSource messages;

    @BeforeEach
    public void setUp() {
        if (testUser == null) {
            initAndLogin();
        }
    }

    @Test
    public void testAddOrder() {
        User siteOwner = testUser;

        Site site = TestUtil.createSite(1);
        site.setOwner(siteOwner);
        siteRepository.save(site);

        OrderRequest orderRequest = new OrderRequest();
        orderRequest.setSiteId(site.getId());
        orderRequest.setViewCount(2000);


        // Отправляем POST-запрос
        HttpEntity<OrderRequest> entity = new HttpEntity<OrderRequest>(orderRequest, authHeaders);
        ResponseEntity<ApiResponse> response = restTemplate.exchange("/api/orders", HttpMethod.POST, entity, ApiResponse.class);

        // Проверяем статус ответа и сообщение
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        ApiResponse body = response.getBody();
        assertThat(body).isNotNull();
        assertThat(body.isSuccess());
        assertThat(body.getMessage()).isEqualTo("Order created successfully");

        // Проверяем, что сайт был добавлен в базу данных
        List<Order> orders = orderRepository.findAll();
        assertThat(orders.size()).isEqualTo(1);

        Order order = orders.get(0);
        assertThat(response.getHeaders().getLocation().getPath()).isEqualTo("/api/orders/" + order.getId());
        assertThat(order.getId()).isNotNull();
        assertThat(order.getViewCount()).isEqualTo(2000);
        assertThat(order.getCreatedAt()).isNotNull();
        assertThat(order.isClosed()).isEqualTo(false);
        assertThat(order.getUser()).isEqualTo(testUser);
        assertThat(order.getSite()).isEqualTo(site);

        Transaction transaction = order.getTransaction();
        Locale currentLocale = LocaleContextHolder.getLocale();
        String description = messages.getMessage("message.transaction.order.description",
                new Object[]{2000, site.getName()},
                currentLocale);

        assertThat(transaction.getDescription()).isEqualTo(description);
        assertThat(transaction.getType()).isEqualTo(TransactionType.ORDER_SITE_VIEW);
        assertThat(transaction.getCreatedAt()).isNotNull();
        assertThat(transaction.isCompleted()).isEqualTo(false);
        assertThat(transaction.getUser()).isEqualTo(testUser);
        assertThat(transaction.getSum()).isEqualTo(
                pricingStrategyFactory.getPricingStrategy().getSiteViewPrice() * 2000);

        testWallet = walletRepository.findById(testWallet.getId()).orElseThrow();
        assertThat(testWallet.getSum()).isEqualTo(520*100);
    }
}
