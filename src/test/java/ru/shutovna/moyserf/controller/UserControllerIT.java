package ru.shutovna.moyserf.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserControllerIT {
    @Autowired
    private UserController userController;

    @Test
    void test() {
        System.out.println(userController.test());
    }
}
