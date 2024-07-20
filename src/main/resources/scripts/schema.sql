CREATE TABLE LOG_MESSAGES (
                                id int4 NOT NULL,
                                created_at timestamp NOT NULL,
                                thread varchar(255),
                                message varchar(200000),
                                PRIMARY KEY (id)
);

CREATE TABLE ORDERS (
                          id int4 NOT NULL,
                          view_count int4 NOT NULL,
                          created_at timestamp NOT NULL,
                          closed bool NOT NULL,
                          user_id int4 NOT NULL,
                          site_id int4 NOT NULL,
                          transaction_id int4 NOT NULL,
                          PRIMARY KEY (id)
);

CREATE TABLE ROLES (
                         id int4 NOT NULL,
                         name varchar(60),
                         PRIMARY KEY (id)
);

CREATE TABLE SITES (
                         id int4 NOT NULL,
                         name varchar(255),
                         description varchar(10000),
                         url varchar(2048) NOT NULL,
                         avatar bytea,
                         user_id int4 NOT NULL,
                         created_at timestamp,
                         CONSTRAINT _copy_1 PRIMARY KEY (id)
);

CREATE TABLE TRANSACTION_TYPES (
                                     id int4 NOT NULL,
                                     name varchar(255) NOT NULL,
                                     PRIMARY KEY (id)
);

CREATE TABLE TRANSACTIONS (
                                id int4 NOT NULL,
                                description varchar(255),
                                type_id int4 NOT NULL,
                                created_at timestamp NOT NULL,
                                wallet_id int4 NOT NULL,
                                sum int8 NOT NULL,
                                completed bool NOT NULL,
                                PRIMARY KEY (id)
);

CREATE TABLE USER_ROLES (
                              user_id int4 NOT NULL,
                              role_id int4 NOT NULL,
                              PRIMARY KEY (user_id, role_id)
);

CREATE TABLE USERS (
                         id int4 NOT NULL,
                         name varchar(255) NOT NULL,
                         email varchar(255) NOT NULL,
                         password varchar(255) NOT NULL,
                         avatar bytea,
                         registered_at timestamp NOT NULL,
                         PRIMARY KEY (id)
);

CREATE TABLE VIEWS (
                         id int4 NOT NULL,
                         user_id int4 NOT NULL,
                         site_id int4 NOT NULL,
                         viewed_at timestamp NOT NULL,
                         transaction_id int4,
                         PRIMARY KEY (id)
);

CREATE TABLE WALLETS (
                           id int4 NOT NULL,
                           sum int8 NOT NULL,
                           user_id int4 NOT NULL,
                           PRIMARY KEY (id)
);

ALTER TABLE ORDERS ADD CONSTRAINT fk_Orders_User FOREIGN KEY (user_id) REFERENCES USERS (id);
ALTER TABLE ORDERS ADD CONSTRAINT fk_Orders_Site FOREIGN KEY (site_id) REFERENCES SITES (id);
ALTER TABLE ORDERS ADD CONSTRAINT fk_Orders_Transaction FOREIGN KEY (transaction_id) REFERENCES TRANSACTIONS (id);
ALTER TABLE SITES ADD CONSTRAINT fk_Site_User FOREIGN KEY (user_id) REFERENCES USERS (id);
ALTER TABLE TRANSACTIONS ADD CONSTRAINT fk_Transaction_Wallet FOREIGN KEY (wallet_id) REFERENCES WALLETS (id);
ALTER TABLE TRANSACTIONS ADD CONSTRAINT fk_Transaction_TransactionType FOREIGN KEY (type_id) REFERENCES TRANSACTION_TYPES (id);
ALTER TABLE USER_ROLES ADD CONSTRAINT fk_user_roles_roles FOREIGN KEY (role_id) REFERENCES ROLES (id);
ALTER TABLE USER_ROLES ADD CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES USERS (id);
ALTER TABLE VIEWS ADD CONSTRAINT fk_View_User FOREIGN KEY (user_id) REFERENCES USERS (id);
ALTER TABLE VIEWS ADD CONSTRAINT fk_View_Site FOREIGN KEY (site_id) REFERENCES SITES (id);
ALTER TABLE VIEWS ADD CONSTRAINT fk_View_Transaction FOREIGN KEY (transaction_id) REFERENCES TRANSACTIONS (id);
ALTER TABLE WALLETS ADD CONSTRAINT fk_Wallet_User FOREIGN KEY (user_id) REFERENCES USERS (id);

