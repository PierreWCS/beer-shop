ALTER TABLE products
ADD CONSTRAINT FK_product_category
foreign key products(id_category) references categories(id);

insert into categories (name) values ('Pale lager');

insert into categories (name) values ('Weissbier');

insert into categories (name) values ('Stout');

insert into categories (name) values ('Dark lager');

insert into products (name, price, image, description, alcohol, quantity, id_category) values ('Celebrator', 2.89, 'celebrator.png', 'Very appreciated by the Professor', 6.5, 1, 2);

insert into products (name, price, image, description, alcohol, quantity, id_category) values ('Duff', 4.69, 'duff.png', 'The very famous beer from The Simpsons! To share with friends in a baseball stadium. Doh !', 5.3, 1, 2);

insert into products (name, price, image, description, alcohol, quantity, id_category) values ('Guinness', 3.89, 'guinness.png', 'The original Guinness beer, brewed in Ireland since 1759', 8.2, 1, 3);

insert into products (name, price, image, description, alcohol, quantity, id_category) values ('Kingfisher', 2.49, 'kingfisher.png', 'A sweet blond beer with a smooth taste of lime', 5.8, 1, 1);

insert into products (name, price, image, description, alcohol, quantity, id_category) values ('Sapporo',3.29, 'sapporo.png', 'Traditional japanese beer, small touch of gingember', 6.9, 1, 1);

insert into products (name, price, image, description, alcohol, quantity, id_category) values ('Tuborg', 3.29, 'tuborg.png', 'Dark lager from Finland', 8.6, 1, 3);

insert into messages (title, mail, name, firstname, body) values ('Do you sell Heineken ?', 'jean-random@gmail.com', 'Random', 'Jean', 'Where is Heineken ?');

insert into messages (title, mail, name, firstname, body) values ('I love React', 'kamoulox@gmail.com', 'Balou', 'Anton', 'Hi, i really love your beers !');
