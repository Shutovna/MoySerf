package ru.shutovna.moyserf.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.shutovna.moyserf.controller.UserSiteKey;
import ru.shutovna.moyserf.controller.ViewToken;
import ru.shutovna.moyserf.error.InvalidViewException;
import ru.shutovna.moyserf.error.SiteNotFoundException;
import ru.shutovna.moyserf.model.*;
import ru.shutovna.moyserf.repository.ViewRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Transactional
@Slf4j
public class ViewService implements IViewService {
    protected static final ConcurrentHashMap<UserSiteKey, List<ViewToken>> map = new ConcurrentHashMap<>();

    private final IUserService userService;

    private final ViewRepository viewRepository;

    private final ITransactionService transactionService;

    private final IPricingStrategyFactory pricingStrategyFactory;

    private final ISiteService siteService;

    private final IOrderService orderService;

    private final IWalletService walletService;

    private final MessageSource messages;

    public ViewService(IUserService userService, ViewRepository viewRepository,
                       ITransactionService transactionService, IPricingStrategyFactory pricingStrategyFactory,
                       ISiteService siteService, IOrderService orderService, IWalletService walletService,
                       MessageSource messages) {
        this.userService = userService;
        this.viewRepository = viewRepository;
        this.transactionService = transactionService;
        this.pricingStrategyFactory = pricingStrategyFactory;
        this.siteService = siteService;
        this.orderService = orderService;
        this.walletService = walletService;
        this.messages = messages;
    }

    @Override
    public View create(long siteId) {
        User currentUser = userService.getCurrentUser();
        User systemUser = userService.getSystemUser();
        Site site = siteService.getSiteById(siteId).orElseThrow(() -> new SiteNotFoundException("Site not found"));

        Locale currentLocale = LocaleContextHolder.getLocale();


        int userSiteViewPrice = pricingStrategyFactory.getPricingStrategy().getUserSiteViewPrice();
        int systemSiteViewPrice = pricingStrategyFactory.getPricingStrategy().getSystemSiteViewPrice();
        int userEarnedReferalSiteViewPrice = pricingStrategyFactory.getPricingStrategy().getUserEarnedReferalSiteViewPrice();

        int systemEarned = systemSiteViewPrice;
        int userEarned = userSiteViewPrice;
        User invitor = currentUser.getInvitor();
        if (invitor != null) {
            String referalDescription = messages.getMessage("message.transaction.referal.description",
                    new Object[]{userEarnedReferalSiteViewPrice, site.getUrl()},
                    currentLocale);
            transactionService.createTransaction(
                    TransactionType.USER_EARNED_REFERAL_SITE_VIEW, referalDescription,
                    userEarnedReferalSiteViewPrice, invitor);
            systemEarned = systemSiteViewPrice - userEarnedReferalSiteViewPrice;

            Wallet wallet = invitor.getWallet();
            wallet.setSum(wallet.getSum() + userEarnedReferalSiteViewPrice);
            walletService.saveWallet(wallet);
        }

        String description = messages.getMessage("message.transaction.view.description",
                new Object[]{userEarned, site.getUrl()},
                currentLocale);
        Transaction userTransaction = transactionService.createTransaction(
                TransactionType.USER_EARNED_SITE_VIEW, description,
                userEarned, currentUser);

        description = messages.getMessage("message.transaction.view.system.description",
                new Object[]{systemEarned, site.getUrl()},
                currentLocale);
        transactionService.createTransaction(
                TransactionType.SYSTEM_EARENED_SITE_VIEW, description,
                systemEarned, systemUser);

        Wallet wallet = currentUser.getWallet();
        wallet.setSum(wallet.getSum() + userEarned);
        walletService.saveWallet(wallet);

        Wallet systemUserWallet = systemUser.getWallet();
        systemUserWallet.setSum(systemUserWallet.getSum() + systemEarned);
        walletService.saveWallet(systemUserWallet);

        View view = new View();
        view.setViewedAt(LocalDateTime.now());
        view.setUser(currentUser);
        view.setOrder(orderService.getFirstOpenedOrderForSite(site));
        view.setTransaction(userTransaction);

        return viewRepository.save(view);
    }

    @Override
    public ViewToken startView(long siteId) {
        User currentUser = userService.getCurrentUser();

        UserSiteKey key = new UserSiteKey(currentUser.getId(), siteId);

        List<ViewToken> viewTokens = new ArrayList<>();
        ViewToken viewToken = new ViewToken(LocalDateTime.now(), UUID.randomUUID().toString());
        viewTokens.add(viewToken);

        map.put(key, viewTokens);

        log.debug("Starting view: key={}, token={}", key, viewToken);
        return viewToken;
    }

    @Override
    public void endView(long siteId, String token) {
        User currentUser = userService.getCurrentUser();
        UserSiteKey key = new UserSiteKey(currentUser.getId(), siteId);
        List<ViewToken> viewTokens = map.get(key);
        boolean success;
        String message;
        if (viewTokens == null || viewTokens.isEmpty()) {
            success = false;
            message = "No view tokens found for " + key;
            log.warn(message);
        } else if (viewTokens.size() != 1) {
            success = false;
            message = "Multiple view tokens found for " + key;
            log.warn(message);
        } else {
            ViewToken viewToken = viewTokens.get(0);
            if (viewToken.getToken().equals(token)) {
                if (viewToken.getTime().plusSeconds(getSiteViewTime()).isAfter(LocalDateTime.now())) {
                    success = false;
                    message = "View token expired for " + key;
                    log.warn(message);
                } else {
                    //Создаем просмотр
                    create(key.getSiteId());
                    map.remove(key);
                    success = true;
                    message = "Successfully ended view " + key;
                    log.info(message);
                }
            } else {
                success = false;
                message = "View tokens not equal for " + key + "current: " + viewToken.getToken() + " user: " + token;
            }
        }

        map.remove(key);
        if (!success) {
            throw new InvalidViewException(message);
        }

    }

    private int getSiteViewTime() {
        return pricingStrategyFactory.getPricingStrategy().getSiteViewTime();
    }
}
