DO $$
    BEGIN
        FOR i IN 1..100 LOOP
                INSERT INTO "Person" (id, name, email, password, registered_at)
                VALUES (
                                i,
                               'Test User ' || i,
                               'testuser' || i || '@example.com',
                               'password' || i,
                               CURRENT_TIMESTAMP
                       );
            END LOOP;
    END $$;