package ru.shutovna.moyserf.payload.response;

import lombok.Data;
import ru.shutovna.moyserf.payload.request.SiteRequest;

import java.util.List;

@Data
public class SiteListResponse {
    private List<SiteResponse> sites;
}
