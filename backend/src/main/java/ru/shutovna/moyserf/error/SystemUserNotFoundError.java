package ru.shutovna.moyserf.error;

public class SystemUserNotFoundError extends Error{
    public SystemUserNotFoundError() {
    }

    public SystemUserNotFoundError(String message) {
        super(message);
    }

    public SystemUserNotFoundError(String message, Throwable cause) {
        super(message, cause);
    }

    public SystemUserNotFoundError(Throwable cause) {
        super(cause);
    }

    public SystemUserNotFoundError(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
