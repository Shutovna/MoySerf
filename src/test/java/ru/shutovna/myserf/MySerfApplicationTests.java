package ru.shutovna.myserf;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ru.shutovna.myserf.controller.UserController;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class MySerfApplicationTests {
    @Autowired
    private UserController userController;

    @Test
    public void contextLoads() throws Exception {
        assertThat(userController).isNotNull();
    }

}
