package ru.shutovna.moyserf.payload.response;

import lombok.Data;
import ru.shutovna.moyserf.util.NotificationEvent;

@Data
public class NotificationResponse {
    private UserInfoResponse userInfo;
    private String message;

    public static NotificationResponse create(NotificationEvent event) {
        NotificationResponse notificationResponse = new NotificationResponse();
        notificationResponse.setUserInfo(UserInfoResponse.from(event.getUser()));
        notificationResponse.setMessage(event.getMessage());
        return notificationResponse;
    }
}
