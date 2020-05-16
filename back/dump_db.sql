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
    role VARCHAR(45) NOT NULL,
    token TEXT
);

CREATE TABLE orders (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    order_date VARCHAR(100),
    order_status VARCHAR(10),
    total_price FLOAT,
    user_id INT NOT NULL
);

CREATE TABLE order_items (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    orders_id INT NOT NULL,
    product_id INT,
    quantity INT
);

CREATE TABLE categories (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(100)  NOT NULL
);

CREATE TABLE products (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	price FLOAT NOT NULL,
	image VARCHAR(150),
	description TEXT NOT NULL,
	alcohol FLOAT NOT NULL,
	quantity INT,
	category_id INT
);

CREATE TABLE messages (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	title VARCHAR(100) NOT NULL,
	mail VARCHAR(150) NOT NULL,
	name VARCHAR(100) NOT NULL,
	firstname VARCHAR(100) NOT NULL,
	date VARCHAR(30),
	body TEXT NOT NULL
);

CREATE TABLE emails (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	mail VARCHAR(150) NOT NULL
);
