DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar(50) UNIQUE,
    password varchar(100) NOT NULL,
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

DROP TABLE IF EXISTS user_habits;

CREATE TABLE user_habits (
    id serial PRIMARY KEY,
    user_id int not null,
    habit_id int not null,
    frequency_id int,
    starting_date DATE
);

DROP TABLE IF EXISTS frequency;

CREATE TABLE frequency (
    id serial PRIMARY KEY,
    frequency_name varchar(50),
    number_of_days int
);

DROP TABLE IF EXISTS user_habits_history;

CREATE TABLE user_habits_history(
    id serial PRIMARY KEY,
    user_habit_id int,
    the_date date
);