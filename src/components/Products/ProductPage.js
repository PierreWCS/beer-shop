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
        <div>
          <h1>{product.name}</h1>
          {/*     Quantity picker     */}
          <div className="quantitySelectorProductPage">
            <p onClick={() => setProductQuantity(productQuantity - 1)} className="minusPlusProductPage">-</p>
            <p>{productQuantity}</p>
            <p onClick={() => setProductQuantity(productQuantity + 1)} className="minusPlusProductPage">+</p>
          </div>
          <div>
            <button>ADD TO CART</button>
            <h2>{product.price}€</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
