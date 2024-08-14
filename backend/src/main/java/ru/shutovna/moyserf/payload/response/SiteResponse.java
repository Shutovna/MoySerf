package ru.shutovna.moyserf.payload.response;

import lombok.Data;
import ru.shutovna.moyserf.model.Site;

@Data
public class SiteResponse {
    private String name;
    private String description;
    private String url;
    private String avatarUrl;

    public static SiteResponse fromSite(Site site) {
        SiteResponse response = new SiteResponse();
        response.name = site.getName();
        response.description = site.getDescription();
        response.url = site.getUrl();
        response.avatarUrl = site.getAvatarUrl();
        return response;
    }
}
