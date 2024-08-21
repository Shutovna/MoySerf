package ru.shutovna.moyserf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.shutovna.moyserf.model.Order;
import ru.shutovna.moyserf.model.Site;
import ru.shutovna.moyserf.payload.request.CreateSiteRequest;
import ru.shutovna.moyserf.payload.request.OrderRequest;
import ru.shutovna.moyserf.payload.request.SiteRequest;
import ru.shutovna.moyserf.payload.response.*;
import ru.shutovna.moyserf.service.IOrderService;
import ru.shutovna.moyserf.service.ISiteService;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.summingInt;

@RestController
@RequestMapping("/api/sites")
public class SiteController {
    private final ISiteService siteService;

    private final IOrderService orderService;

    @Autowired
    public SiteController(ISiteService siteService, IOrderService orderService) {
        this.siteService = siteService;
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<SiteListResponse> getAllSites() {
        List<Site> sites = siteService.getSites();
        SiteListResponse response = new SiteListResponse();
        response.setSites(sites.stream().map(SiteResponse::fromSite).toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my")
    public ResponseEntity<MySiteListResponse> getMySites() {
        List<Site> sites = siteService.getMySites();
        MySiteListResponse response = new MySiteListResponse();
        response.setSites(sites.stream().map(site -> {
            List<Order> orders = site.getOrders();
            int orderedViewCount = orders.stream().mapToInt(Order::getViewCount).sum();
            int viewCount = orders.stream().mapToInt(order -> order.getViews().size()).sum();
            int restViewCount = orderedViewCount - viewCount;
            if (viewCount > orderedViewCount || restViewCount < 0) {
                throw new IllegalStateException("orderedViewCount: " + orderedViewCount + " restViewCount: " + restViewCount);
            }

            return MySiteResponse.fromSite(site, viewCount, restViewCount);
        }).toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/forView")
    public ResponseEntity<SiteListResponse> getSitesForView() {
        List<Site> sites = siteService.getSitesForView();
        SiteListResponse response = new SiteListResponse();
        response.setSites(sites.stream().map(SiteResponse::fromSite).toList());
        return ResponseEntity.ok(response);
    }


    @PostMapping
    public ResponseEntity<ApiResponse> createSite(@RequestBody CreateSiteRequest siteRequest) {
        Site site = siteService.createSite(siteRequest);

        OrderRequest orderRequest = new OrderRequest();
        orderRequest.setSiteId(site.getId());
        orderRequest.setViewCount(siteRequest.getViewCount());
        orderService.createOrder(orderRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/sites/{0}")
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
