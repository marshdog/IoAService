CREATE DATABASE ioa;
use ioa;

CREATE TABLE users (
  id int auto_increment primary key,
  username varchar(20),
  password varchar(20),
  site varchar(20)
);

CREATE TABLE ioaForms (
  id int auto_increment primary key,
  user_id int,
  date varchar(20),
  less_than_fifteen int,
  greater_than_fifteen int,
  limited_english_proficiency int,
  total_forms int
);

INSERT INTO users VALUES (1, 'agallay', 'doof', 'hayward');
INSERT INTO users VALUES (2, ' ', '', '');
