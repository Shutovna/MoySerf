package ru.shutovna.moyserf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.shutovna.moyserf.error.SiteNotFoundException;
import ru.shutovna.moyserf.error.UnauthorizedException;
import ru.shutovna.moyserf.model.Site;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.model.View;
import ru.shutovna.moyserf.payload.request.CreateSiteRequest;
import ru.shutovna.moyserf.payload.request.SiteRequest;
import ru.shutovna.moyserf.repository.SiteRepository;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Transactional
public class SiteService implements ISiteService {
    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private IUserService userService;

    @Autowired
    private IPricingStrategyFactory pricingStrategyFactory;

    @Override
    public List<Site> getSites() {
        return siteRepository.findAll();
    }

    @Override
    public List<Site> getSitesForView() {
        List<Site> allSites = getSitesOpenedForView();
        User currentUser = userService.getCurrentUser();
        List<View> views = currentUser.getViews();
        HashMap<Long, List<View>> siteViews = views.stream().collect(Collectors.groupingBy(
                o -> o.getOrder().getSite().getId(),
                HashMap::new,
                Collectors.toList()
        ));
        IPricingStrategy pricingStrategy = pricingStrategyFactory.getPricingStrategy();
        int siteViewPeriod = pricingStrategy.getSiteViewPeriod();

        List<Site> result = allSites.stream().filter(site -> {
            List<View> userSiteViews = siteViews.get(site.getId());
            //если нет просмотров
            return userSiteViews == null
                    //или нет просмотров за последние 24 часа
                    || userSiteViews.stream().filter(
                    view -> view.getViewedAt().isAfter(LocalDateTime.now().minusHours(siteViewPeriod))).toList().isEmpty();
        }).toList();
        return result;
    }

    public List<Site> getSitesOpenedForView() {
        return siteRepository.findOpenedForView();
    }

    @Override
    public List<Site> getMySites() {
        return siteRepository.findByOwnerOrderByCreatedAtDesc(userService.getCurrentUser());
    }

    @Override
    public Site createSite(CreateSiteRequest siteRequest) {
        User user = userService.getCurrentUser();

        Site site = new Site();
        site.setName(siteRequest.getName());
        site.setDescription(siteRequest.getDescription());
        site.setUrl(siteRequest.getUrl());
        site.setAvatarUrl(siteRequest.getAvatarUrl());
        site.setCreatedAt(LocalDateTime.now());
        site.setOwner(user);

        return siteRepository.save(site);
    }

    @Override
    public Site saveSite(long id, SiteRequest siteRequest) {
        Site site = getSiteById(id).orElseThrow(() -> new SiteNotFoundException("Site " + id + " not found"));

        User currentUser = userService.getCurrentUser();
        if (!currentUser.equals(site.getOwner())) {
            throw new UnauthorizedException("You are not owner of this site");
        }

        site.setName(siteRequest.getName());
        site.setDescription(siteRequest.getDescription());
        site.setUrl(siteRequest.getUrl());
        site.setAvatarUrl(siteRequest.getAvatarUrl());

        return siteRepository.save(site);
    }

    @Override
    public Optional<Site> getSiteById(long id) {
        return siteRepository.findById(id);
    }
}

