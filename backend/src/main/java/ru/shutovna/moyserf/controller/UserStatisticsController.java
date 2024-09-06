package ru.shutovna.moyserf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.shutovna.moyserf.service.IStatisticsService;

@RestController
@RequestMapping("/api/userStats")
public class UserStatisticsController {
    @Autowired
    private IStatisticsService statisticsService;

    @GetMapping("/userViewCount")
    public int getUserViewCount() {
        return statisticsService.getUserViewCount();
    }

    @GetMapping("/userEarned")
    public long getUserEarned() {
        return statisticsService.getUserEarned();
    }

    @GetMapping("/userEarnedByReferals")
    public long getUserEarnedByReferals() {
        return statisticsService.getUserEarnedByReferals();
    }

    @GetMapping("/myReferalsCount")
    public int getMyReferalsCount() {
        return statisticsService.getMyReferalsCount();
    }

    @GetMapping("/myReferalsIncome")
    public long getMyReferalsIncome() {
        return statisticsService.getMyReferalsIncome();
    }

    @GetMapping("/myReferalsViewCount")
    public long getMyReferalsViewCount() {
        return statisticsService.getMyReferalsViewCount();
    }
}
