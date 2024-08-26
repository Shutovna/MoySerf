package ru.shutovna.moyserf.service;

import java.util.List;

public interface IStatisticsService {
    long getTotalIncome();

    long getTotalReferalsIncome();

    int getAdvertisersCount();

    int getWorkersCount();

    List<Object[]> getUsersTotalIncome(Integer limit);
}
