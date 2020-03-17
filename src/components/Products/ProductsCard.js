import React, {useState} from "react";
import "./ProductsCard.css";
import {Link} from "react-router-dom";

const ProductCard = ({ product }) => {
  const addProductToCart = () => {
    let stockCart = JSON.parse(localStorage.getItem("clientCart"));
    if (stockCart && stockCart.length > 0) {
      const idStockCart = stockCart.map(product => product.id);
      console.log(stockCart);
      if (idStockCart.includes(product.id)) {
        for (let i = 0; i < stockCart.length; i++) {
          if (stockCart[i].id === product.id) {
            stockCart[i].quantity += 1;
          }
        }
      }
      else {
        stockCart.push(product);
      }
      localStorage.setItem("clientCart", JSON.stringify(stockCart));
      document.location.reload();
    } else {
      let cartInit = [];
      cartInit.push(product);
      localStorage.setItem("clientCart", JSON.stringify(cartInit));
    }
  };

  return (
    <div className="itemProductCardContainer">
      <h3 className="productNameProductCard">{product.name}</h3>
      <img
        className="productImageProductCard"
        src={require(`../images/beers_products/${product.image}`)}
        alt={product.name}
      />
      <p className="productDescriptionProductCard">{product.description}</p>
      <p className="productPriceProductCard">{product.price} €</p>
      <Link to={{
        pathname: "/product-page",
        state: product
      }}
      >See more</Link>
      <button
        onClick={addProductToCart}
        className="aboutUsButton productCardButton"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
