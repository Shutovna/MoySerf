package ru.shutovna.moyserf.controller;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserSiteKey {
    private long userId;
    private long siteId;
}
