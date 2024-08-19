package ru.shutovna.moyserf.service;

import ru.shutovna.moyserf.model.Site;
import ru.shutovna.moyserf.payload.request.CreateSiteRequest;
import ru.shutovna.moyserf.payload.request.SiteRequest;

import java.util.List;
import java.util.Optional;

public interface ISiteService {

    List<Site> getSites();

    List<Site> getSitesForView();

    List<Site> getMySites();

    Optional<Site> getSiteById(long id);

    Site createSite(CreateSiteRequest siteRequest);

    Site saveSite(long id, SiteRequest siteRequest);
}
