DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar(50) UNIQUE,
    password varchar(30) NOT NULL
);

DROP TABLE IF EXISTS user_details;

CREATE TABLE user_details (
    user_id int NOT NULL,
    first_name varchar(200),
    last_name varchar(200),
    email_address varchar(256) UNIQUE
);

DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
    id serial PRIMARY KEY,
    category varchar(100) UNIQUE
);

DROP TABLE IF EXISTS habits;

CREATE TABLE habits (
    id serial PRIMARY KEY,
    habit varchar(100) UNIQUE,
    category_id int NOT NULL
);