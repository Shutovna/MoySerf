CREATE TABLE "Log" (
                       "id" int4 NOT NULL,
                       "created_at" timestamp NOT NULL,
                       "thread" varchar(255),
                       "message" varchar(200000),
                       PRIMARY KEY ("id")
);

CREATE TABLE "Orders" (
                          "id" int4 NOT NULL,
                          "view_count" int4 NOT NULL,
                          "created_at" timestamp NOT NULL,
                          "closed" bool NOT NULL,
                          "person_id" int4 NOT NULL,
                          "site_id" int4 NOT NULL,
                          "transaction_id" int4 NOT NULL,
                          PRIMARY KEY ("id")
);

CREATE TABLE "Person" (
                          "id" int4 NOT NULL,
                          "name" varchar(255) NOT NULL,
                          "email" varchar(255) NOT NULL,
                          "password" varchar(255) NOT NULL,
                          "avatar" bytea,
                          "registered_at" timestamp NOT NULL,
                          PRIMARY KEY ("id")
);

CREATE TABLE "Site" (
                        "id" int4 NOT NULL,
                        "name" varchar(255),
                        "description" varchar(10000),
                        "url" varchar(2048) NOT NULL,
                        "avatar" bytea,
                        "owner_id" int4 NOT NULL,
                        "created_at" timestamp,
                        CONSTRAINT "_copy_1" PRIMARY KEY ("id")
);

CREATE TABLE "Transaction" (
                               "id" int4 NOT NULL,
                               "description" varchar(255),
                               "type_id" int4 NOT NULL,
                               "created_at" timestamp NOT NULL,
                               "wallet_id" int4 NOT NULL,
                               "sum" int8 NOT NULL,
                               "completed" bool NOT NULL,
                               PRIMARY KEY ("id")
);

CREATE TABLE "TransactionType" (
                                   "id" int4 NOT NULL,
                                   "name" varchar(255) NOT NULL,
                                   PRIMARY KEY ("id")
);

CREATE TABLE "Views" (
                         "id" int4 NOT NULL,
                         "person_id" int4 NOT NULL,
                         "site_id" int4 NOT NULL,
                         "viewed_at" timestamp NOT NULL,
                         "transaction_id" int4,
                         PRIMARY KEY ("id")
);

CREATE TABLE "Wallet" (
                          "id" int4 NOT NULL,
                          "sum" int8 NOT NULL,
                          "person_id" int4 NOT NULL,
                          PRIMARY KEY ("id")
);

ALTER TABLE "Orders" ADD CONSTRAINT "fk_Orders_Person" FOREIGN KEY ("person_id") REFERENCES "Person" ("id");
ALTER TABLE "Orders" ADD CONSTRAINT "fk_Orders_Site" FOREIGN KEY ("site_id") REFERENCES "Site" ("id");
ALTER TABLE "Orders" ADD CONSTRAINT "fk_Orders_Transaction_1" FOREIGN KEY ("transaction_id") REFERENCES "Transaction" ("id");
ALTER TABLE "Site" ADD CONSTRAINT "fk_Site_Person" FOREIGN KEY ("owner_id") REFERENCES "Person" ("id");
ALTER TABLE "Transaction" ADD CONSTRAINT "fk_Transaction_Wallet" FOREIGN KEY ("wallet_id") REFERENCES "Wallet" ("id");
ALTER TABLE "Transaction" ADD CONSTRAINT "fk_Transaction_TransactionType" FOREIGN KEY ("type_id") REFERENCES "TransactionType" ("id");
ALTER TABLE "Views" ADD CONSTRAINT "fk_View_Person" FOREIGN KEY ("person_id") REFERENCES "Person" ("id");
ALTER TABLE "Views" ADD CONSTRAINT "fk_View_Site" FOREIGN KEY ("site_id") REFERENCES "Site" ("id");
ALTER TABLE "Views" ADD CONSTRAINT "fk_View_Transaction_1" FOREIGN KEY ("transaction_id") REFERENCES "Transaction" ("id");
ALTER TABLE "Wallet" ADD CONSTRAINT "fk_Wallet_Person" FOREIGN KEY ("person_id") REFERENCES "Person" ("id");

