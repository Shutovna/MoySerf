package ru.shutovna.moyserf.service;

import ru.shutovna.moyserf.controller.ViewToken;
import ru.shutovna.moyserf.model.View;

public interface IViewService {
    View create(long siteId);

    ViewToken startView(long siteId);

    void endView(long siteId, String token);
}
