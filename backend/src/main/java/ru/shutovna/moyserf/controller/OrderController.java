package ru.shutovna.moyserf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.shutovna.moyserf.model.Order;
import ru.shutovna.moyserf.model.Site;
import ru.shutovna.moyserf.payload.request.OrderRequest;
import ru.shutovna.moyserf.payload.response.ApiResponse;
import ru.shutovna.moyserf.service.IOrderService;

import java.net.URI;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private IOrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse> addOrder(@RequestBody OrderRequest orderRequest) {
        Order order = orderService.createOrder(orderRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/orders/{0}")
                .buildAndExpand(order.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Order created successfully"));
    }
}
