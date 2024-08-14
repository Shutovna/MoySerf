package ru.shutovna.moyserf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.shutovna.moyserf.model.Site;
import ru.shutovna.moyserf.payload.request.SiteRequest;
import ru.shutovna.moyserf.payload.response.ApiResponse;
import ru.shutovna.moyserf.payload.response.SiteListResponse;
import ru.shutovna.moyserf.payload.response.SiteResponse;
import ru.shutovna.moyserf.service.ISiteService;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sites")
public class SiteController {
    private final ISiteService siteService;

    @Autowired
    public SiteController(ISiteService siteService) {
        this.siteService = siteService;
    }

    @GetMapping
    public ResponseEntity<SiteListResponse> getAllSites() {
        List<Site> sites = siteService.getSites();
        SiteListResponse response = new SiteListResponse();
        response.setSites(sites.stream().map(SiteResponse::fromSite).toList());
        return ResponseEntity.ok(response);
    }


    @PostMapping
    public ResponseEntity<ApiResponse> createSite(@RequestBody SiteRequest siteRequest) {
        Site site = siteService.createSite(siteRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/sites/")
                .buildAndExpand(site.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Site registered successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateSite(@PathVariable Long id, @RequestBody SiteRequest siteRequest) {
        Site updatedSite = siteService.saveSite(id, siteRequest);
        return ResponseEntity.ok()
                .body(new ApiResponse(true, "Site updated successfully"));
    }

}
