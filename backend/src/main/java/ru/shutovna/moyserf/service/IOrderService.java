package ru.shutovna.moyserf.service;

import ru.shutovna.moyserf.model.Order;
import ru.shutovna.moyserf.payload.request.OrderRequest;

import java.util.List;
import java.util.Optional;

public interface IOrderService {
    List<Order> getAllOrders();

    Optional<Order> getOrder(long orderId);

    Order createOrder(OrderRequest orderRequest);
}
