package ru.shutovna.moyserf.service;

import ru.shutovna.moyserf.controller.UserSiteKey;
import ru.shutovna.moyserf.controller.ViewToken;
import ru.shutovna.moyserf.model.Site;
import ru.shutovna.moyserf.model.User;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class ViewServiceUtil {
    public static void viewTokenMinusViewTime(User referalUser, Site site, long siteViewTime) {
        List<ViewToken> viewTokens = ViewService.map.get(new UserSiteKey(referalUser.getId(), site.getId()));
        assertThat(viewTokens.size()).isEqualTo(1);
        ViewToken viewToken = viewTokens.get(0);
        viewToken.setTime(viewToken.getTime().minusSeconds(siteViewTime));
    }
}
