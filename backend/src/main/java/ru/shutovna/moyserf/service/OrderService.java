package ru.shutovna.moyserf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.shutovna.moyserf.error.NotEnoughMoneyException;
import ru.shutovna.moyserf.error.SiteNotFoundException;
import ru.shutovna.moyserf.error.UnauthorizedException;
import ru.shutovna.moyserf.model.*;
import ru.shutovna.moyserf.payload.request.OrderRequest;
import ru.shutovna.moyserf.repository.OrderRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
@Transactional
public class OrderService implements IOrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ISiteService siteService;

    @Autowired
    private IUserService userService;

    @Autowired
    private ITransactionService transactionService;

    @Autowired
    private IWalletService walletService;

    @Autowired
    private IPricingStrategyFactory pricingStrategyFactory;

    @Autowired
    private MessageSource messages;

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> getOrder(long orderId) {
        return orderRepository.findById(orderId);
    }

    @Override
    public Order createOrder(OrderRequest orderRequest) {
        User currentUser = userService.getCurrentUser();
        Site site = siteService.getSiteById(orderRequest.getSiteId()).orElseThrow(
                () -> new SiteNotFoundException("Site not found"));

        if (!site.getOwner().equals(currentUser)) {
            throw new UnauthorizedException("You do not own this site");
        }

        int viewCount = orderRequest.getViewCount();
        Locale currentLocale = LocaleContextHolder.getLocale();
        String description = messages.getMessage("message.transaction.order.description",
                new Object[]{viewCount, site.getName()},
                currentLocale);
        long sum = viewCount * pricingStrategyFactory.getPricingStrategy().getSiteViewPrice();

        Transaction transaction = transactionService.createTransaction(TransactionType.ORDER_SITE_VIEW,
                description, sum, currentUser);

        Wallet wallet = currentUser.getWallet();
        if (sum <= wallet.getSum()) {
            wallet.setSum(wallet.getSum() - sum);
        } else {
            throw new NotEnoughMoneyException("Not enough money");
        }
        walletService.saveWallet(wallet);

        Order order = new Order();
        order.setSite(site);
        order.setViewCount(viewCount);
        order.setCreatedAt(LocalDateTime.now());
        order.setUser(currentUser);
        order.setTransaction(transaction);

        return orderRepository.save(order);
    }

    @Override
    public Order getFirstOpenedOrderForSite(Site site) {
        return orderRepository.findAllBySiteAndClosedIsFalseOrderByCreatedAtAsc(site).stream().findFirst().orElseThrow();
    }
}
