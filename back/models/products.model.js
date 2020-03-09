const db = require('./database');

const Product = function(product) {
  this.id = product.id;
  this.name = product.name;
  this.price = product.price;
  this.image = product.image;
  this.description = product.description;
  this.alcohol = product.alcohol;
  this.quantity = product.quantity;
};

Product.create = (newProduct, result) => {
  db.query('INSERT INTO products SET ?', newProduct, (error, dbResult) => {
    if (error) {return result(error, null)}
    return result(null, {id: dbResult.insertId, ...newProduct});
  })
};

Product.findAll = result => {
  db.query('SELECT * FROM products', (error, dbResult) => {
    if (error) {return result(error, null)}
    return result(null, dbResult);
  })
};

Product.update = (id, product, result) => {
  db.query('UPDATE products SET ? WHERE id = ?', [product, id], (error, response) => {
      if (error) { return result(error, null) }
      if (response.affectedRows === 0) {
        //  Not found product with the id
        return result({kind: 'not_found'}, null);
      }
      return result(null, {id: Number(id), ...product});
    }
  )
};

// Delete product with ID

Product.delete = (id, result) => {
  db.query('DELETE FROM products WHERE id = ?', id, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    if (dbResult.affectedRows === 0) {
      //  not found the product with the id
      return result({kind: 'not found'}, null);
    }

    return result(null, dbResult);
  })
};

module.exports = Product;
