package ru.shutovna.moyserf.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import ru.shutovna.moyserf.error.SiteNotFoundException;
import ru.shutovna.moyserf.error.UnauthorizedException;
import ru.shutovna.moyserf.model.Order;
import ru.shutovna.moyserf.model.Site;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.model.View;
import ru.shutovna.moyserf.payload.request.CreateSiteRequest;
import ru.shutovna.moyserf.payload.request.SiteRequest;
import ru.shutovna.moyserf.repository.SiteRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class SiteServiceTest {

    @Mock
    private SiteRepository siteRepository;

    @Mock
    private IUserService userService;

    @Mock
    private IPricingStrategyFactory pricingStrategyFactory;

    @InjectMocks
    private SiteService siteService;

    private User testUser;
    private Site testSite;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        testUser = new User();
        testUser.setName("testuser");

        testSite = new Site();
        testSite.setId(1L);
        testSite.setName("Test Site");
        testSite.setOwner(testUser);
    }

    @Test
    void testGetSites() {
        when(siteRepository.findAll()).thenReturn(Arrays.asList(testSite));

        List<Site> sites = siteService.getSites();

        assertNotNull(sites);
        assertEquals(1, sites.size());
        assertEquals(testSite.getName(), sites.get(0).getName());
    }

    @Test
    void testGetMySites() {
        when(userService.getCurrentUser()).thenReturn(testUser);
        when(siteRepository.findByOwner(testUser)).thenReturn(Arrays.asList(testSite));

        List<Site> mySites = siteService.getMySites();

        assertNotNull(mySites);
        assertEquals(1, mySites.size());
        assertEquals(testSite.getName(), mySites.get(0).getName());
    }

    @Test
    void testCreateSite() {
        CreateSiteRequest siteRequest = new CreateSiteRequest();
        siteRequest.setName("Test Site");
        siteRequest.setDescription("Description");
        siteRequest.setUrl("http://newsite.com");
        siteRequest.setAvatarUrl("http://newsite.com/avatar.png");
        siteRequest.setViewCount(100);

        when(userService.getCurrentUser()).thenReturn(testUser);
        when(siteRepository.save(any(Site.class))).thenReturn(testSite);

        Site createdSite = siteService.createSite(siteRequest);

        assertNotNull(createdSite);
        assertEquals(testUser, createdSite.getOwner());
        assertEquals("Test Site", createdSite.getName());
        verify(siteRepository, times(1)).save(any(Site.class));
    }

    @Test
    void testSaveSite_ValidOwner() {
        SiteRequest siteRequest = new SiteRequest();
        siteRequest.setName("Updated Site");
        siteRequest.setDescription("Updated Description");
        siteRequest.setUrl("http://updatedsite.com");
        siteRequest.setAvatarUrl("http://updatedsite.com/avatar.png");

        when(siteRepository.findById(1L)).thenReturn(Optional.of(testSite));
        when(userService.getCurrentUser()).thenReturn(testUser);
        when(siteRepository.save(any(Site.class))).thenReturn(testSite);

        Site savedSite = siteService.saveSite(1L, siteRequest);

        assertNotNull(savedSite);
        assertEquals("Updated Site", savedSite.getName());
        verify(siteRepository, times(1)).save(testSite);
    }

    @Test
    void testSaveSite_InvalidOwner() {
        SiteRequest siteRequest = new SiteRequest();
        siteRequest.setName("Updated Site");

        User anotherUser = new User();
        anotherUser.setName("anotheruser");

        when(siteRepository.findById(1L)).thenReturn(Optional.of(testSite));
        when(userService.getCurrentUser()).thenReturn(anotherUser);

        assertThrows(UnauthorizedException.class, () -> siteService.saveSite(1L, siteRequest));
    }

    @Test
    void testSaveSite_NotFound() {
        SiteRequest siteRequest = new SiteRequest();
        siteRequest.setName("Updated Site");

        when(siteRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(SiteNotFoundException.class, () -> siteService.saveSite(1L, siteRequest));
    }
}
