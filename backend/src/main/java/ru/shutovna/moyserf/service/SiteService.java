package ru.shutovna.moyserf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.shutovna.moyserf.error.SiteNotFoundException;
import ru.shutovna.moyserf.error.UserNotFoundException;
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
        site.setName(siteRequest.getName());
        site.setDescription(siteRequest.getDescription());
        site.setUrl(siteRequest.getUrl());

        return siteRepository.save(site);
    }

    @Override
    public Optional<Site> getSiteById(long id) {
        return siteRepository.findById(id);
    }
}

