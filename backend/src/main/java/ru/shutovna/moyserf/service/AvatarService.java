package ru.shutovna.moyserf.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ru.shutovna.moyserf.error.UserNotFoundException;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.util.Constants;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
@Transactional
@Slf4j
public class AvatarService implements IAvatarService {
    @Autowired
    private IUserService userService;

    @Override
    public String uploadAvatar(String originalFileName, InputStream fileInputStream) throws IOException {
        User currentUser = userService.getCurrentUser();
        String fileName = "avatar-" + currentUser.getId() + "_" + originalFileName;
        Path directory = Paths.get(Constants.AVATARS_UPLOAD_DIR);
        if (!Files.exists(directory)) {
            log.info("Creating avatars upload directory {}", directory);
            Files.createDirectories(directory);
        }
        Path path = Paths.get(directory + "/" + fileName);
        Files.copy(fileInputStream, path, StandardCopyOption.REPLACE_EXISTING);

        User user = userService.findUserByID(currentUser.getId()).orElseThrow(
                () -> new UserNotFoundException("User " + currentUser.getId() + " not found"));
        user.setImageUrl(path.toString());
        userService.save(user);

        log.debug("File saved to {}", path);

        return fileName;
    }

    @Override
    public UrlResource getAvatar(long userId) throws MalformedURLException {
        User user = userService.findUserByID(userId).orElseThrow(
                () -> new UserNotFoundException("User " + userId + " not found"));
        Path path = Paths.get(user.getImageUrl());
        return new UrlResource(path.toUri());
    }
}
