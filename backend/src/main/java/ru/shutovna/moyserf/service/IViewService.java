package ru.shutovna.moyserf.service;

import ru.shutovna.moyserf.controller.ViewToken;
import ru.shutovna.moyserf.model.View;

public interface IViewService {
    View create(int siteId);

    ViewToken startView(int siteId);

    void endView(int siteId, String token);
}
