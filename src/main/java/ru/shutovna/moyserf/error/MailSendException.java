package ru.shutovna.moyserf.error;

public class MailSendException extends Exception{
    public MailSendException() {
    }

    public MailSendException(String message) {
        super(message);
    }

    public MailSendException(String message, Throwable cause) {
        super(message, cause);
    }

    public MailSendException(Throwable cause) {
        super(cause);
    }

    public MailSendException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
