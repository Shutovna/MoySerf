package ru.shutovna.moyserf.payload.response;

import lombok.Data;
import ru.shutovna.moyserf.model.Site;

@Data
public class MySiteResponse {
    private long id;
    private String name;
    private String description;
    private String url;
    private String avatarUrl;

    private int viewCount;
    private int restViewCount;



    public static MySiteResponse fromSite(Site site, int viewCount, int restViewCount) {
        MySiteResponse response = new MySiteResponse();
        response.id = site.getId();
        response.name = site.getName();
        response.description = site.getDescription();
        response.url = site.getUrl();
        response.avatarUrl = site.getAvatarUrl();
        response.viewCount = viewCount;
        response.restViewCount = restViewCount;
        return response;
    }
}
