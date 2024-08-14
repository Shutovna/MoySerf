do
$$
    DECLARE sys_user_id int := 1;
    DECLARE site_owner_user_id int := 2;
    DECLARE curr_user_id int;
    DECLARE order_id int := 1;

    BEGIN

        INSERT INTO public.users(id, email, email_verified, image_url, name, password, provider, provider_id,
                                 invitor_id, created_at)
        VALUES (sys_user_id,
                'System@gmail.com',
                true,
                'https://cdn.dribbble.com/users/31752/screenshots/2099305/media/1e626c1fe398db2a7aa405e39c3870eb.png?resize=800x600&vertical=center',
                'System',
                '$2a$12$EN01mK9Vkc86IcVKYQTwuuonvSWeSLRUdOHv8IgEuWngkXaUWweby',
                'local', null, null, CURRENT_TIMESTAMP);

        FOR id in 2..55
            LOOP
                INSERT INTO public.users(id, email, email_verified, image_url, name, password, provider, provider_id,
                                         invitor_id, created_at)
                VALUES (id,
                        'User' || id || '@gmail.com',
                        true,
                        'https://cdn.dribbble.com/users/31752/screenshots/2099305/media/1e626c1fe398db2a7aa405e39c3870eb.png?resize=800x600&vertical=center',
                        'User' || id,
                        '$2a$12$EN01mK9Vkc86IcVKYQTwuuonvSWeSLRUdOHv8IgEuWngkXaUWweby',
                        'local', null, null, CURRENT_TIMESTAMP);

                INSERT INTO public.wallets(id, sum, user_id)
                VALUES (id,
                        CASE
                            WHEN id % 3 = 0 THEN 100 * 1000
                            WHEN id % 2 = 0 THEN 100 * 500
                            ELSE 0 END,
                        id);
            END LOOP;

        INSERT INTO public.sites(id, avatar_url, created_at, description, name, url, owner_id)
        VALUES (1, null, CURRENT_TIMESTAMP, 'Simple description', 'Parabox', 'https://paraboxclub.space/', site_owner_user_id);
        INSERT INTO public.sites(id, avatar_url, created_at, description, name, url, owner_id)
        VALUES (2, null, CURRENT_TIMESTAMP, 'DNS-Shop', 'DNS-Shop', 'https://www.dns-shop.ru/', site_owner_user_id);
        INSERT INTO public.sites(id, avatar_url, created_at, description, name, url, owner_id)
        VALUES (3, null, CURRENT_TIMESTAMP, 'freepik', 'freepik', 'https://ru.freepik.com/', site_owner_user_id);


        UPDATE wallets SET sum = 100*5000 WHERE user_id = site_owner_user_id;

        INSERT INTO public.transactions(id, completed, created_at, description, sum, type, user_id)
        VALUES (1, true, CURRENT_TIMESTAMP, '', 24*100*5, 'ORDER_SITE_VIEW', site_owner_user_id);

        INSERT INTO public.orders(
            id, closed, created_at, view_count, site_id, transaction_id, user_id)
        VALUES (order_id, false, CURRENT_TIMESTAMP, 500, 1, 1, site_owner_user_id);

        UPDATE wallets SET sum = sum - 24*100*5 WHERE user_id = site_owner_user_id;



        FOR i in 2..500 BY 2
            LOOP
                curr_user_id := floor(random() * (55 - 2 + 1) + 2)::int;

                INSERT INTO public.transactions(id, completed, created_at, description, sum, type, user_id)
                VALUES (i, true, CURRENT_TIMESTAMP, '', 20, 'USER_EARNED_SITE_VIEW', curr_user_id);

                INSERT INTO public.transactions(id, completed, created_at, description, sum, type, user_id)
                VALUES (i+1, true, CURRENT_TIMESTAMP, '', 4, 'SYSTEM_EARENED_SITE_VIEW', sys_user_id);

                INSERT INTO public.views(id, viewed_at, site_id, transaction_id, order_id, user_id)
                VALUES (i, CURRENT_TIMESTAMP, 1, i, order_id, curr_user_id);
            END LOOP;
    END
$$;