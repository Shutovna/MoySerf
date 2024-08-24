package ru.shutovna.moyserf.service;

import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.MetadataException;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;

public interface IAvatarService {
    String uploadAvatar(String originalFileName, InputStream fileInputStream);

    void rotateAvatar(double angle);

    UrlResource getAvatar(long userId) throws MalformedURLException;
}
