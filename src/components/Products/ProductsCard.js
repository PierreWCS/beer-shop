import React, { useState } from "react";
import "./ProductsCard.css";
import ProductPage from "./ProductPage";
import useGlobalState from "../../hooks/useGlobalState";

const ProductCard = ({ product, products, index }) => {
  const [moreDetails, setMoreDetails] = useState(false);
  const { userCart } = useGlobalState();

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
      } else {
        console.log(product);
        product.quantity = 1;
        stockCart.push(product);
        userCart({stockCart})
      }
      localStorage.setItem("clientCart", JSON.stringify(stockCart));
    } else {
      let cartInit = [];
      cartInit.push(product);
      localStorage.setItem("clientCart", JSON.stringify(cartInit));
    }
  };

  return (
    <div className="itemProductCardContainer">
      <h3 className="productNameProductCard">{product.name}</h3>
      {
        product.image ?
          <img
            className="productImageProductCard"
            src={`uploads/images/${product.image}`}
            alt={product.name}
          />
          : <p>No image for this product</p>
      }
      <p className="productDescriptionProductCard">{product.description}</p>
      <p className="productPriceProductCard">{product.price} €</p>
      <button onClick={() => {
        setMoreDetails(true);
        document.body.style.overflow = "hidden";
      }}
              className="linkToProductPage">See more</button>
      <button
        onClick={addProductToCart}
        className="aboutUsButton productCardButton"
      >
        Add to cart
      </button>
      {
        moreDetails ?
          <ProductPage index={index} products={products} product={product} setMoreDetails={setMoreDetails} />
          : null
      }
    </div>
  );
};

export default ProductCard;
