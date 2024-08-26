CREATE TABLE "log_messages" (
                                "id" int4 NOT NULL,
                                "created_at" timestamp(6) NOT NULL,
                                "message" varchar(200000) COLLATE "pg_catalog"."default",
                                "thread" varchar(255) COLLATE "pg_catalog"."default",
                                CONSTRAINT "log_messages_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "log_messages" OWNER TO "postgres";

CREATE TABLE "orders" (
                          "id" int4 NOT NULL,
                          "closed" bool NOT NULL,
                          "created_at" timestamp(6) NOT NULL,
                          "view_count" int4 NOT NULL,
                          "site_id" int4 NOT NULL,
                          "transaction_id" int4 NOT NULL,
                          "user_id" int4 NOT NULL,
                          CONSTRAINT "orders_pkey" PRIMARY KEY ("id"),
                          CONSTRAINT "uq_site_tran" UNIQUE ("site_id", "transaction_id")
);
ALTER TABLE "orders" OWNER TO "postgres";

CREATE TABLE "password_reset_tokens" (
                                         "id" int4 NOT NULL,
                                         "expiry_date" timestamp(6),
                                         "token" varchar(255) COLLATE "pg_catalog"."default",
                                         "user_id" int8 NOT NULL,
                                         CONSTRAINT "password_reset_token_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "password_reset_tokens" OWNER TO "postgres";

CREATE TABLE "privileges" (
                              "id" int8 NOT NULL,
                              "name" varchar(255) COLLATE "pg_catalog"."default",
                              CONSTRAINT "privilege_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "privileges" OWNER TO "postgres";

CREATE TABLE "roles" (
                         "id" int4 NOT NULL,
                         "name" varchar(255) COLLATE "pg_catalog"."default",
                         CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "roles" OWNER TO "postgres";

CREATE TABLE "roles_privileges" (
                                    "role_id" int8 NOT NULL,
                                    "privilege_id" int8 NOT NULL
);
ALTER TABLE "roles_privileges" OWNER TO "postgres";

CREATE TABLE "sites" (
                         "id" int4 NOT NULL,
                         "created_at" timestamp(6),
                         "description" varchar(10000) COLLATE "pg_catalog"."default",
                         "name" varchar(255) COLLATE "pg_catalog"."default",
                         "url" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
                         "owner_id" int4 NOT NULL,
                         "avatar_url" varchar(255) COLLATE "pg_catalog"."default",
                         CONSTRAINT "sites_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "sites" OWNER TO "postgres";

CREATE TABLE "transactions" (
                                "id" int4 NOT NULL,
                                "completed" bool,
                                "created_at" timestamp(6) NOT NULL,
                                "description" varchar(255) COLLATE "pg_catalog"."default",
                                "sum" int8,
                                "type" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
                                "user_id" int4 NOT NULL,
                                CONSTRAINT "transactions_pkey" PRIMARY KEY ("id"),
                                CONSTRAINT "check_transactions_sum" CHECK (sum > 0)
);
ALTER TABLE "transactions" OWNER TO "postgres";

CREATE TABLE "users" (
                         "id" int4 NOT NULL,
                         "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
                         "email_verified" bool NOT NULL,
                         "image_url" varchar(255) COLLATE "pg_catalog"."default",
                         "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
                         "password" varchar(255) COLLATE "pg_catalog"."default",
                         "provider" varchar(255) COLLATE "pg_catalog"."default",
                         "provider_id" varchar(255) COLLATE "pg_catalog"."default",
                         "invitor_id" int4,
                         "created_at" timestamp(6) NOT NULL,
                         "hidden" bool DEFAULT false,
                         CONSTRAINT "users_pkey" PRIMARY KEY ("id"),
                         CONSTRAINT "uk6dotkott2kjsp8vw4d0m25fb7" UNIQUE ("email"),
                         CONSTRAINT "uq_users_name" UNIQUE ("name")
);
ALTER TABLE "users" OWNER TO "postgres";

CREATE TABLE "users_roles" (
                               "user_id" int4 NOT NULL,
                               "role_id" int4 NOT NULL
);
ALTER TABLE "users_roles" OWNER TO "postgres";

CREATE TABLE "verification_tokens" (
                                       "id" int4 NOT NULL,
                                       "expiry_date" timestamp(6),
                                       "token" varchar(255) COLLATE "pg_catalog"."default",
                                       "user_id" int4 NOT NULL,
                                       CONSTRAINT "verification_token_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "verification_tokens" OWNER TO "postgres";

CREATE TABLE "views" (
                         "id" int4 NOT NULL,
                         "viewed_at" timestamp(6) NOT NULL,
                         "transaction_id" int4 NOT NULL,
                         "user_id" int4 NOT NULL,
                         "order_id" int4 NOT NULL,
                         CONSTRAINT "views_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "views" OWNER TO "postgres";

CREATE TABLE "vips" (
                        "id" int4 NOT NULL,
                        "type" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
                        "started_at" timestamp(6) NOT NULL,
                        "ended_at" timestamp(6),
                        "transaction_id" int4 NOT NULL,
                        "user_id" int4 NOT NULL,
                        CONSTRAINT "vips_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "vips" OWNER TO "postgres";

CREATE TABLE "vips_actions" (
                                "id" int4 NOT NULL,
                                "vip_id" int4,
                                "type" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
                                "created_at" timestamp(6) NOT NULL,
                                "transaction_id" int8 NOT NULL,
                                CONSTRAINT "vips_actions_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "vips_actions" OWNER TO "postgres";

CREATE TABLE "wallets" (
                           "id" int4 NOT NULL,
                           "sum" int4 NOT NULL,
                           "user_id" int4 NOT NULL,
                           CONSTRAINT "wallets_pkey" PRIMARY KEY ("id"),
                           CONSTRAINT "check_wallets_sum" CHECK (sum >= 0)
);
ALTER TABLE "wallets" OWNER TO "postgres";

ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_sites" FOREIGN KEY ("site_id") REFERENCES "sites" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_transactions" FOREIGN KEY ("transaction_id") REFERENCES "transactions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_users" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "fk_password_reset_tokens_users" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "roles_privileges" ADD CONSTRAINT "fk_roles_previliges_previliges" FOREIGN KEY ("privilege_id") REFERENCES "privileges" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "roles_privileges" ADD CONSTRAINT "fk_roles_previliges_roles" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "sites" ADD CONSTRAINT "fk_sites_users" FOREIGN KEY ("owner_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "transactions" ADD CONSTRAINT "fk_transactions_users" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "users" ADD CONSTRAINT "fk_users_users" FOREIGN KEY ("invitor_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "users_roles" ADD CONSTRAINT "fk_users_roles_roles" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "users_roles" ADD CONSTRAINT "fk_users_roles_users" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "verification_tokens" ADD CONSTRAINT "fk_verification_token_users" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "views" ADD CONSTRAINT "fk_views_orders_1" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "views" ADD CONSTRAINT "fk_views_transsactions" FOREIGN KEY ("transaction_id") REFERENCES "transactions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "views" ADD CONSTRAINT "fk_views_users" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "vips" ADD CONSTRAINT "fk_vips_transactions" FOREIGN KEY ("transaction_id") REFERENCES "transactions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "vips" ADD CONSTRAINT "fk_vips_users_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "vips_actions" ADD CONSTRAINT "fk_vip_action_transactions" FOREIGN KEY ("transaction_id") REFERENCES "transactions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "vips_actions" ADD CONSTRAINT "fk_vip_actions_vips" FOREIGN KEY ("vip_id") REFERENCES "vips" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "wallets" ADD CONSTRAINT "fk_wallets_users" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

