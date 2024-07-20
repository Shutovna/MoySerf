DO $$
    DECLARE
        deleted_user_id integer;
    BEGIN
        select id from user_account where email='shutovna1987@gmail.com' into deleted_user_id;
        delete from verification_token where user_id = deleted_user_id;
        delete from password_reset_token where user_id = deleted_user_id;
        delete from users_roles where user_id = deleted_user_id;
        delete from user_account WHERE ID = deleted_user_id;
    END $$;

