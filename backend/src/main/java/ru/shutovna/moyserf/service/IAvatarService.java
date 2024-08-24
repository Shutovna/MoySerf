package ru.shutovna.moyserf.service;

import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;

public interface IAvatarService {
    String uploadAvatar(String originalFileName, InputStream fileInputStream) throws IOException;

    UrlResource getAvatar(long userId) throws MalformedURLException;
}
