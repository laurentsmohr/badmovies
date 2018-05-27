CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE movies (
    id int NOT NULL,
    title varchar(100),
    poster varchar(100),
    popularity int,
    year int,
    PRIMARY KEY (id)
);