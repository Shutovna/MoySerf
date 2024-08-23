package ru.shutovna.moyserf.service;

public class SimplePricingStrategy implements IPricingStrategy{
    @Override
    public int getUserSiteViewPrice() {
        return 20;
    }

    @Override
    public int getSystemSiteViewPrice() {
        return 4;
    }

    @Override
    public int getSiteViewPrice() {
        return 24;
    }

    @Override
    public int getSiteViewPeriod() {
        return 24;
    }

    @Override
    public int getSiteViewTime() {
        return 5;
    }
}
