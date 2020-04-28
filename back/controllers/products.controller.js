const fs = require('fs');
const Product = require('../models/products.model');
const multer = require("multer");

// Create a new product
exports.create = (request, response) => {
  console.log("Hello");
  if (!request.body) {
    return response.status(400).send({
      message: 'Content can not be empty!'
    })
  }
  console.log(request.body);

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
    console.log(product);
    if (error) {
      return response.status(500).send({
        message: error.message || 'Some error occured while creating the Product.'
      });
    } else {
      if (product.image !== null) {
        const storage = multer.diskStorage({
          destination: function(req, file, cb) {
            cb(null, "uploads/");
          },
          filename: function(req, file, cb) {
            cb(null, file.originalname);
          }
        });
        const upload = multer({ storage: storage }).array("file");

        upload(product.image, function(err) {
          if (err instanceof multer.MulterError) {
            console.log("Error when uploading")
            // A Multer error occurred when uploading.
          } else if (err) {
            console.log("An unknown error has occured")
            // An unknown error occurred when uploading.
          }
          console.log('Success !');
          product.image = `./uploads/${product.name}`;
          // Everything went fine.
        });
      } else console.log("no image");


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
