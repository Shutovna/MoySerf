package ru.shutovna.moyserf.error;

public class AlreadyViewedException extends RuntimeException{
    public AlreadyViewedException() {
    }

    public AlreadyViewedException(String message) {
        super(message);
    }

    public AlreadyViewedException(String message, Throwable cause) {
        super(message, cause);
    }

    public AlreadyViewedException(Throwable cause) {
        super(cause);
    }

    public AlreadyViewedException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
