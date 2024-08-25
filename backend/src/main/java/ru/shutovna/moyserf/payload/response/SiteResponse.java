package ru.shutovna.moyserf.payload.response;

import lombok.Data;
import ru.shutovna.moyserf.model.Site;
import ru.shutovna.moyserf.model.User;

@Data
public class SiteResponse {
    private Integer id;
    private String name;
    private String description;
    private String url;
    private String avatarUrl;
    private SiteOwnerResponse owner;

    public static SiteResponse fromSite(Site site) {
        SiteResponse response = new SiteResponse();
        response.id = site.getId();
        response.name = site.getName();
        response.description = site.getDescription();
        response.url = site.getUrl();
        response.avatarUrl = site.getAvatarUrl();
        User owner = site.getOwner();
        response.setOwner(new SiteOwnerResponse(owner.getId(), owner.getName(), owner.getImageUrl()));
        return response;
    }
}
