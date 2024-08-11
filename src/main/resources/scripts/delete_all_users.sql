DO $$
    BEGIN
        delete from verification_token;
        delete from password_reset_token;
        delete from users_roles;
        delete from users;
    END $$;

