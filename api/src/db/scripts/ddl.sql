CREATE DATABASE memory_game

CREATE SCHEMA gen;

CREATE TABLE gen.Turns (
	id serial NOT NULL,
	cardsCount INT NOT NULL,
	numbersOnCards varchar(2000) NULL,
	clicksOrder varchar(100) NOT NULL,
	status INT NOT NULL,
    creationDate varchar(50) NOT NULL,
	CONSTRAINT turn_pkey PRIMARY KEY (id)
);

