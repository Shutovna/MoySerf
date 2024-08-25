package ru.shutovna.moyserf.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.shutovna.moyserf.error.ImageException;
import ru.shutovna.moyserf.error.UserNotFoundException;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.util.Constants;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Transactional
@Slf4j
public class AvatarService implements IAvatarService {
    @Autowired
    private IUserService userService;


    @Override
    public String uploadAvatar(String originalFileName, InputStream inputStream) {
        try {
            User currentUser = userService.getCurrentUser();
            String fileName = "avatar-" + currentUser.getId() + "_" + originalFileName;
            Path directory = Paths.get(Constants.AVATARS_UPLOAD_DIR);
            if (!Files.exists(directory)) {
                log.info("Creating avatars upload directory {}", directory);
                Files.createDirectories(directory);
            }

            Path target = Paths.get(directory + "/" + fileName);
            BufferedImage originalImage = ImageIO.read(inputStream);

            BufferedImage cropped = crop(originalImage);
            BufferedImage resized = resize(cropped, 500, 500);

            File outputFile = target.toFile();
            ImageIO.write(resized, "jpg", outputFile);

            User user = userService.findUserByID(currentUser.getId()).orElseThrow(
                    () -> new UserNotFoundException("User " + currentUser.getId() + " not found"));
            user.setImageUrl(target.toString());
            userService.save(user);

            return fileName;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new ImageException(e);
        }
    }

    public BufferedImage crop(BufferedImage originalImage) {
        // Загрузите изображение

        // Определите размеры исходного изображения
        int width = originalImage.getWidth();
        int height = originalImage.getHeight();

        // Вычислите длину стороны квадрата и смещение для обрезки
        int newSide = Math.min(width, height);
        int xOffset = (width - newSide) / 2;
        int yOffset = (height - newSide) / 2;

        // Обрежьте изображение до квадратной формы

       return originalImage.getSubimage(xOffset, yOffset, newSide, newSide);
    }

    @Override
    public void rotateAvatar(double angle) {
        try {
            User currentUser = userService.getCurrentUser();
            File originalFile = new File(currentUser.getImageUrl());
            BufferedImage originalImage = ImageIO.read(originalFile);

            BufferedImage rotatedImage = rotate(originalImage, angle);
            ImageIO.write(rotatedImage, "jpg", originalFile);
            log.debug("Avatar rotated {} angle {}", originalFile, angle);

        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new ImageException(e);
        }
    }

    private static BufferedImage resize(BufferedImage originalImage, int width, int height) {
        // Создание нового пустого изображения размером 100x100 пикселей
        BufferedImage resizedImage = new BufferedImage(width, height, originalImage.getType());

        // Получение объекта Graphics2D для рисования на новом изображении
        Graphics2D g = resizedImage.createGraphics();

        // Рисование оригинального изображения на новом с изменением размера
        g.drawImage(originalImage, 0, 0, width, height, null);
        g.dispose();

        return resizedImage;
    }

    private static BufferedImage rotate(BufferedImage originalImage, double rotationAngle) {
        // Создание нового пустого изображения с повернутыми размерами
        BufferedImage rotatedImage = new BufferedImage(
                originalImage.getHeight(),
                originalImage.getWidth(),
                originalImage.getType());

        // Создание объекта AffineTransform для поворота на 90 градусов
        AffineTransform transform = new AffineTransform();
        transform.translate(rotatedImage.getWidth() / 2, rotatedImage.getHeight() / 2);
        if (rotationAngle > 0) {
            transform.rotate(Math.PI / 2);
        } else if (rotationAngle < 0) {
            transform.rotate(-Math.PI / 2);
        }
        transform.translate(-originalImage.getWidth() / 2, -originalImage.getHeight() / 2);

        // Применение трансформации к изображению
        AffineTransformOp op = new AffineTransformOp(transform, AffineTransformOp.TYPE_BILINEAR);
        op.filter(originalImage, rotatedImage);


        /*int width = originalImage.getWidth();
        int height = originalImage.getHeight();
        int newWidth = (int) Math.abs(width * Math.cos(rotationAngle)) + (int) Math.abs(height * Math.sin(rotationAngle));
        int newHeight = (int) Math.abs(height * Math.cos(rotationAngle)) + (int) Math.abs(width * Math.sin(rotationAngle));

        BufferedImage outputImage = new BufferedImage(newWidth, newHeight, originalImage.getType());

        AffineTransform transform = new AffineTransform();
        transform.rotate(rotationAngle, newWidth / 2, newHeight / 2);

        transform.translate((newWidth - width) / 2, (newHeight - height) / 2);

        Graphics2D g2d = outputImage.createGraphics();
        g2d.setTransform(transform);
        g2d.drawImage(originalImage, 0, 0, null);
        g2d.dispose();*/
        return rotatedImage;
    }

    @Override
    public UrlResource getAvatar(long userId) throws MalformedURLException {
        User user = userService.findUserByID(userId).orElseThrow(
                () -> new UserNotFoundException("User " + userId + " not found"));
        if (user.getImageUrl() == null) {
            return null;
        }
        Path path = Paths.get(user.getImageUrl());
        return new UrlResource(path.toUri());
    }
}
