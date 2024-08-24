package ru.shutovna.moyserf.service;

public interface IPricingStrategy {
    int getUserSiteViewPrice();
    int getSystemSiteViewPrice();
    int getUserEarnedReferalSiteViewPrice();
    int getSiteViewPrice();
    int getSiteViewPeriod();
    int getSiteViewTime();
}
