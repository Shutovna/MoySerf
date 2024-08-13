DO $$
    BEGIN
        delete from verification_tokens;
        delete from password_reset_tokens;
        delete from users_roles;
        delete from users;
    END $$;

