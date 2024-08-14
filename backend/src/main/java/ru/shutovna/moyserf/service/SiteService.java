package ru.shutovna.moyserf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.shutovna.moyserf.error.SiteNotFoundException;
import ru.shutovna.moyserf.error.UnauthorizedException;
import ru.shutovna.moyserf.model.Site;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.payload.request.SiteRequest;
import ru.shutovna.moyserf.repository.SiteRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SiteService implements ISiteService {
    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private IUserService userService;

    @Override
    public List<Site> getSites() {
        return siteRepository.findAll();
    }

    @Override
    public List<Site> getSitesForView() {
        List<Site> all = siteRepository.findAll();
        User currentUser = userService.getCurrentUser();
        return all;
    }

    public List<Site> getSitesOpenedForView() {
        List<Site> all = siteRepository.findAll();
        return all;
    }

    @Override
    public List<Site> getMySites() {
        return siteRepository.findByOwner(userService.getCurrentUser());
    }

    @Override
    public Site createSite(SiteRequest siteRequest) {
        User user = userService.getCurrentUser();

        Site site = new Site();
        site.setName(siteRequest.getName());
        site.setDescription(siteRequest.getDescription());
        site.setUrl(siteRequest.getUrl());
        site.setAvatarUrl(siteRequest.getAvatarUrl());
        site.setOwner(user);

        return siteRepository.save(site);
    }

    @Override
    public Site saveSite(long id, SiteRequest siteRequest) {
        Site site = getSiteById(id).orElseThrow(() -> new SiteNotFoundException("Site " + id + " not found"));

        User currentUser = userService.getCurrentUser();
        if(!currentUser.equals(site.getOwner())) {
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

