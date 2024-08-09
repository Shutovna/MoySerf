package ru.shutovna.moyserf;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ru.shutovna.moyserf.web.controller.UsersController;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class MoySerfApplicationTests {
    @Autowired
    private UsersController usersController;

    @Test
    public void contextLoads() throws Exception {
        assertThat(usersController).isNotNull();
    }

}
