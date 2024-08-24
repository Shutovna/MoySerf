package ru.shutovna.moyserf.controller;

import lombok.extern.slf4j.Slf4j;
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
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URI;
import java.nio.file.Files;
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
            // Чтение изображения с диска
            BufferedImage originalImage = ImageIO.read(file.getInputStream());
            BufferedImage scaledImage = resizeImageUsingGetScaledInstance(originalImage, 100, 100);

            // Сохранение сжатого изображения на диск
            File tempFile = File.createTempFile(UUID.randomUUID().toString(), ".jpg");
            ImageIO.write(scaledImage, "jpg", tempFile);

            try (FileInputStream fileInputStream = new FileInputStream(tempFile)) {
                String fileName = avatarService.uploadAvatar(file.getOriginalFilename(), fileInputStream);
                User currentUser = userService.getCurrentUser();
                URI location = ServletUriComponentsBuilder
                        .fromCurrentContextPath().path("/api/avatars/{0}")
                        .buildAndExpand(currentUser.getId()).toUri();

                log.debug("File {} uploaded to {}", fileName, location);
                return ResponseEntity.created(location)
                        .body(new ApiResponse(true, "Avatar uploaded successfully"));
            } finally {
                tempFile.delete();
            }

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public static BufferedImage resizeImageUsingGetScaledInstance(BufferedImage originalImage, int targetWidth, int targetHeight) {
        Image scaledImage = originalImage.getScaledInstance(targetWidth, targetHeight, Image.SCALE_SMOOTH);
        BufferedImage resizedImage = new BufferedImage(targetWidth, targetHeight, originalImage.getType());

        Graphics2D g2d = resizedImage.createGraphics();
        g2d.drawImage(scaledImage, 0, 0, null);
        g2d.dispose();

        return resizedImage;
    }

    @GetMapping(value = "/{userId}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getAvatar(@PathVariable long userId) {
        try {
            UrlResource resource = avatarService.getAvatar(userId);

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
            return ResponseEntity.badRequest().build();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}


