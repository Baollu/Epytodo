CREATE DATABASE IF NOT EXISTS epytodo;

USE epytodo;

CREATE TABLE IF NOT EXISTS user
(
    id int NOT NULL AUTO_INCREMENT primary key,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    firstname varchar(255) NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS todo
(
    id int NOT NULL AUTO_INCREMENT primary key,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    due_time datetime NOT NULL,
    status ENUM('not started', 'todo', 'in progress', 'done') NOT NULL DEFAULT('not started') ,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
