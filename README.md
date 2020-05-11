# BEER SHOP 

Fake beer shop, started during a 48hours website challenge.
With MySQL, Node.JS, Express, JWT and React.


## DEMO:

Demo available here:

> Netlify doesn't work with databse so there is no authentication on the demo and products are from a JSON.

[Try it on netlify](https://beer-shop-wcs.netlify.com/)


## FEATURES:

### User can:

- Add products to his cart, saved in the localstorage. 

- Make an order, and follow the evolution of the order

- Have an order history

- Create an account, login and subscribe to the shop newsletter.

- Send a message with a contact form on the "about" page.


### ADMIN can:

If the user is connected with an admin account, he can have an access to the url: /admin, and he can:

- Manage the products, stocks, and add new products from the website. 

- Manage the orders and modify the status

- See the messages from the contact form 

- See people who registered to the newsletter.

- He can upload images on the server and manage theses


## USE:

Use dumb.sql code to create the database, then use insert.sql to fill the database.

type the commands:

in /:
```
npm install
npm start
```

in /back
```
npm install
nodemon index.js
```

Note: to have an access to the admin panel, you must create an account from the sign in form, and update the role to "admin"
