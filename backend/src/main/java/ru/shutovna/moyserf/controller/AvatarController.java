package ru.shutovna.moyserf.controller;

import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.name.Rename;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.payload.response.ApiResponse;
import ru.shutovna.moyserf.service.IAvatarService;
import ru.shutovna.moyserf.service.IUserService;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/avatars")
@Slf4j
public class AvatarController {
    @Autowired
    private IAvatarService avatarService;

    @Autowired
    private IUserService userService;

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse> uploadAvatar(@RequestParam("file") MultipartFile file) {
        try {
            avatarService.uploadAvatar(file.getOriginalFilename(), file.getInputStream());

            User currentUser = userService.getCurrentUser();
            final URI location = ServletUriComponentsBuilder
                    .fromCurrentContextPath().path("/api/avatars/{0}")
                    .buildAndExpand(currentUser.getId()).toUri();

            return ResponseEntity.created(location)
                    .body(new ApiResponse(true, "Avatar uploaded successfully"));

        } catch (IOException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/rotate")
    public ResponseEntity<ApiResponse> rotateAvatar(@RequestParam("angle") double angle) {
        avatarService.rotateAvatar(angle);
        return ResponseEntity.ok()
                .body(new ApiResponse(true, "Avatar rotated successfully"));
    }

    @GetMapping(value = "/{userId}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getAvatar(@PathVariable long userId) {
        try {
            UrlResource resource = avatarService.getAvatar(userId);

            if (resource == null) {
                return ResponseEntity.noContent().build();
            }
            if (resource.exists() && resource.isReadable()) {
                byte[] imageBytes = IOUtils.toByteArray(resource.getInputStream());
                return ResponseEntity
                        .ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, String.format("inline; filename=\"%s\"", resource.getFilename()))
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(imageBytes);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        } catch (IOException e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }
}


