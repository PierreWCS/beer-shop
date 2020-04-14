const fs = require('fs');
const Product = require('../models/products.model');

const filepath = "./uploads/";
// Create a new product
exports.create = (request, response) => {
  if (!request.body) {
    return response.status(400).send({
      message: 'Content can not be empty!'
    })
  }

  // Create a product
  const product = new Product({
    id: request.body.id,
    name: request.body.name || null,
    price: request.body.price || null,
    image: request.body.image || null,
    description: request.body.description || null,
    alcohol: request.body.alcohol || null,
    quantity: request.body.quantity || null
  });

  // Save product in database
  Product.create(product, (error, data) => {
    if (error) {
      return response.status(500).send({
        message: error.message || 'Some error occured while creating the Product.'
      });
    } else {
      const imageFilePath = `${filepath}${product.name}`;
      fs.writeFile(imageFilePath, product.image, err => {
        console.log(err);
      });
      return response.send(data);
    }
  });
};

// Get all products
exports.findAll = (request, response) => {
  Product.findAll((error, dbResult) => {
    if (error) {
      response.status(500).send({
        message: error.message || 'Some error occurred while retrieving products.'
      });
    } else {
      response.send(dbResult);
    }
  })
};

// Update product
exports.update = function (request, response) {
  if (!request.body) {
    response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const { productId } = request.params;

  Product.update(productId, request.body, (error, data) => {
      if (error) {
        if (error.kind === 'not_found') {
          response.status(404).send({
            message: `Not found product with id ${productId}.`
          });
        } else {
          response.status(500).send({
            message: 'Error updating product with id ' + productId
          });
        }
      } else {
        response.send(data);
      }
    }
  );
};

// Delete Product
exports.delete = (request, response) => {
  const productId = request.params.productId.replace(':', '');
  Product.delete(productId, (error, dbResult) => {
    if (error) {
      if (error.kind === 'not_found') {
        response.status(404).send({
          message: `Not found product with id ${productId}.`
        });
      } else {
        response.status(500).send({
          message: 'Could not delete product with id ' + productId
        });
      }
    } else {
      response.send({message: `Product was deleted successfully!`});
    }
  });
};
