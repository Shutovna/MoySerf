DO $$
    DECLARE
        next_val integer;
    BEGIN
        DELETE FROM users_roles;
        DELETE FROM users;
        DELETE FROM roles;
        INSERT INTO roles(id, name) VALUES(1, 'ROLE_ADMIN');
        INSERT INTO roles(id, name) VALUES(2, 'ROLE_USER');

        FOR i IN 1..100 LOOP
                -- Получение следующего значения из последовательности
                next_val := nextval('users_seq');

                INSERT INTO users (id, name, email, password, registered_at)
                VALUES (
                           next_val,
                               'Test User ' || i,
                               'testuser' || i || '@example.com',
                               'password' || i,
                               CURRENT_TIMESTAMP
                       );
                INSERT INTO users_roles(user_id, role_id)  VALUES (next_val, 2);

            END LOOP;

        next_val := nextval('users_seq');
        INSERT INTO users (id, name, email, password, registered_at)
        VALUES (
                   next_val,
                   'Nikitos ',
                   'shutovna1987@gmail.com',
                   'password',
                   CURRENT_TIMESTAMP
               );
        INSERT INTO users_roles(user_id, role_id)  VALUES (next_val, 1);
    END $$;