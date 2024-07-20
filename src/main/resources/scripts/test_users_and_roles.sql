DO $$
    BEGIN
        INSERT INTO roles(id, name) VALUES(1, 'ROLE_ADMIN');
        INSERT INTO roles(id, name) VALUES(2, 'ROLE_USER');

        FOR i IN 1..100 LOOP
                INSERT INTO users (id, name, email, password, registered_at)
                VALUES (
                                i,
                               'Test User ' || i,
                               'testuser' || i || '@example.com',
                               'password' || i,
                               CURRENT_TIMESTAMP
                       );
                INSERT INTO user_roles(user_id, role_id)  VALUES (i, 2);

            END LOOP;

        INSERT INTO users (id, name, email, password, registered_at)
        VALUES (
                   101,
                   'Nikitos ',
                   'shutovna1987@gmail.com',
                   'password',
                   CURRENT_TIMESTAMP
               );
        INSERT INTO user_roles(user_id, role_id)  VALUES (101, 1);
    END $$;