package ru.shutovna.moyserf.error;

public class InvalidViewException extends RuntimeException {
    public InvalidViewException() {
    }

    public InvalidViewException(String message) {
        super(message);
    }

    public InvalidViewException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidViewException(Throwable cause) {
        super(cause);
    }

    public InvalidViewException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
