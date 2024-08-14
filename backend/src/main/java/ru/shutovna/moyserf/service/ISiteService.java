package ru.shutovna.moyserf.service;

import ru.shutovna.moyserf.model.Site;
import ru.shutovna.moyserf.payload.request.SiteRequest;

import java.util.List;
import java.util.Optional;

public interface ISiteService {

    List<Site> getSites();

    List<Site> getMySites();

    Optional<Site> getSiteById(long id);

    Site createSite(SiteRequest siteRequest);

    Site saveSite(long id, SiteRequest siteRequest);
}
