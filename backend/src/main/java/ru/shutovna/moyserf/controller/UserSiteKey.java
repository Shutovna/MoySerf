package ru.shutovna.moyserf.controller;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserSiteKey {
    private int userId;
    private int siteId;
}
