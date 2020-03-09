DROP database IF EXISTS beershop_db;

CREATE database beershop_db;

USE beershop_db;

CREATE TABLE users (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    phone VARCHAR(45) NOT NULL,
    role VARCHAR(45) NOT NULL
);

CREATE TABLE products (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	price FLOAT NOT NULL,
	image VARCHAR(150),
	description TEXT NOT NULL,
	alcohol FLOAT NOT NULL,
	quantity INT
);

CREATE TABLE messages (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	title VARCHAR(100) NOT NULL,
	mail VARCHAR(150) NOT NULL,
	name VARCHAR(100) NOT NULL,
	firstname VARCHAR(100) NOT NULL,
	body TEXT NOT NULL
);

insert into products (name, price, image, description, alcohol, quantity) values ('Celebrator', 2.89, 'celebrator.png', 'Very appreciated by the Professor', 6.5, 1);

insert into products (name, price, image, description, alcohol, quantity) values ('Duff', 4.69, 'duff.png', 'The very famous beer from The Simpsons! To share with friends in a baseball stadium. Doh !', 5.3, 1);

insert into products (name, price, image, description, alcohol, quantity) values ('Guinness', 3.89, 'guinness.png', 'The original Guinness beer, brewed in Ireland since 1759', 8.2, 1);

insert into products (name, price, image, description, alcohol, quantity) values ('Kingfisher', 2.49, 'kingfisher.png', 'A sweet blond beer with a smooth taste of lime', 5.8, 1);

insert into products (name, price, image, description, alcohol, quantity) values ('Sapporo',3.29, 'sapporo.png', 'Traditional japanese beer, small touch of gingember', 6.9, 1);

insert into products (name, price, image, description, alcohol, quantity) values ('Tuborg', 3.29, 'tuborg.png', 'Dark lager from Finland', 8.6, 1);

insert into messages (title, mail, name, firstname, body) values ('Do you sell Heineken ?', 'jean-random@gmail.com', 'Random', 'Jean', 'Where is Heineken ?');

insert into messages (title, mail, name, firstname, body) values ('I love React', 'kamoulox@gmail.com', 'Balou', 'Anton', 'Hi, i really love your beers !');
