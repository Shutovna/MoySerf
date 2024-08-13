do
$$
    BEGIN

        FOR id in 1..55
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

        INSERT INTO public.sites(id, avatar, created_at, description, name, url, owner_id)
        VALUES (1, null, CURRENT_TIMESTAMP, 'Simple description', 'Parabox', 'https://paraboxclub.space/', 1);
        INSERT INTO public.sites(id, avatar, created_at, description, name, url, owner_id)
        VALUES (2, null, CURRENT_TIMESTAMP, 'DNS-Shop', 'DNS-Shop', 'https://www.dns-shop.ru/', 1);
        INSERT INTO public.sites(id, avatar, created_at, description, name, url, owner_id)
        VALUES (3, null, CURRENT_TIMESTAMP, 'freepik', 'freepik', 'https://ru.freepik.com/', 1);


        INSERT INTO public.transactions(
            id, completed, created_at, description, sum, type, wallet_id, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        INSERT INTO public.views(
            id, viewed_at, site_id, transaction_id, user_id)
        VALUES (?, ?, ?, ?, ?);

        /* FOR post_id in 1..50
             LOOP
                 INSERT INTO post(post_id, title, content, profile_id, date_added)
                 VALUES (post_id,
                         CASE WHEN post_id % 2 = 0 THEN post_id || 'post' ELSE 'post' || post_id END,
                         repeat('a', post_id),
                         post_id,
                         CURRENT_TIMESTAMP);
             END LOOP;
         FOR comment_id in 1..50
             LOOP
                 IF comment_id <= 45
                 THEN
                     CALL insertComment(comment_id, comment_id, comment_id);
                 ELSE
                     CONTINUE;
                 END IF;

                 IF
                     comment_id % 2 = 0
                 THEN
                     CALL insertComment(comment_id * 100, comment_id, comment_id);
                 END IF;

                 if
                     comment_id % 10 = 0
                 THEN
                     CALL insertComment(comment_id * 1000, comment_id, comment_id);
                 END IF;
             END LOOP;*/
    END
$$;