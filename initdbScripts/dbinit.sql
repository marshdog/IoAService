CREATE DATABASE ioa;
use ioa;

CREATE TABLE users (
  id int,
  username varchar(20),
  password varchar(20),
  site varchar(20)
);

INSERT INTO users VALUES (1, 'agallay', 'doof', 'hayward');
INSERT INTO users VALUES (2, ' ', '', '');
