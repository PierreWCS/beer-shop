import React, { useEffect, useState } from "react";
import Axios from "axios";
import ProductCard from "./ProductsCard";
import "./ProductsList.css";
import Footer from "../Footer/Footer";

const ProductsList = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    Axios.get("http://localhost:8000/api/products")
      .then((result) => result.data)
      .then((data) => {
        setProducts(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        const stockProducts = require("../fakeDb/fakeDb.json");
        console.log(stockProducts);
        setProducts(stockProducts);
      });
  };

  return (
    <div className="productsMainContainer">
      <h1 className="productsListTitle">ALL THE BEERS</h1>
      {products ? (
        <div className="productsListContainer">
          {products.map((product, key) => {
            return (
              <ProductCard products={products} product={product} index={key} />
            );
          })}
        </div>
      ) : null}
      <Footer />
    </div>
  );
};

export default ProductsList;
