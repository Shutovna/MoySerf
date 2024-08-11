package ru.shutovna.moyserf.service;

import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.scheduling.annotation.Async;

import java.sql.SQLException;


public interface MyService {

    @Retryable
    @Async
    void retryService();

    @Retryable(retryFor = SQLException.class)
    void retryServiceWithRecovery(String sql) throws SQLException;

    @Retryable(retryFor = SQLException.class , maxAttempts = 2, backoff = @Backoff(delay = 100))
    void retryServiceWithCustomization(String sql) throws SQLException;

    @Retryable(retryFor = SQLException.class, maxAttemptsExpression = "${retry.maxAttempts}",
                        backoff = @Backoff(delayExpression = "${retry.maxDelay}"))
    void retryServiceWithExternalConfiguration(String sql) throws SQLException;

    @Recover
    void recover(SQLException e, String sql);

    void templateRetryService();
}
