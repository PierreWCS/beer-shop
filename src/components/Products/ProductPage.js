import React, { useState } from "react";
import "./ProductPage.css";

const ProductPage = props => {
  const [productQuantity, setProductQuantity] = useState(1);
  const product = props.location.state;
  return (
    <div className="productPageMainContainer">
      <div className="productPageImagePriceContainer">
        <div>
          <img
            className="imageProductPage"
            src={require(`../images/beers_products/${product.image}`)}
            alt="product"
          />
        </div>
        <div className="namePriceContainerProductPage">
          <h1>{product.name}</h1>
          {/*     Quantity picker     */}
          <h3>Quantity</h3>
          <div className="quantitySelectorProductPage">
            <p
              onClick={() => {
                if (productQuantity > 1) {
                  setProductQuantity(productQuantity - 1);
                }
              }}
              className="minusPlusProductPage minusProductPage"
            >
              -
            </p>
            <p>{productQuantity}</p>
            <p
              onClick={() => setProductQuantity(productQuantity + 1)}
              className="minusPlusProductPage plusProductPage"
            >
              +
            </p>
          </div>
          <div>
            <button className="addToCartButtonProductPage">ADD TO CART</button>
            <h2>{product.price}€</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
