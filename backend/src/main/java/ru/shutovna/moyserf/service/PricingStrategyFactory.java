package ru.shutovna.moyserf.service;

import org.springframework.stereotype.Service;

@Service
public class PricingStrategyFactory implements IPricingStrategyFactory{
    @Override
    public IPricingStrategy getPricingStrategy() {
        return new SimplePricingStrategy();
    }
}
