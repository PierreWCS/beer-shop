import React, { useState } from "react";
import "./ProductPage.css";

const ProductPage = ({ product, setMoreDetails, products, index }) => {
  const addProductToCartPage = () => {
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
      }
      localStorage.setItem("clientCart", JSON.stringify(stockCart));
      document.location.reload();
    } else {
      let cartInit = [];
      cartInit.push(product);
      localStorage.setItem("clientCart", JSON.stringify(cartInit));
    }
  };

  const [productQuantity, setProductQuantity] = useState(1);
  return (
    <div className="productPageMainContainer">
      <div className="productPageImagePriceContainer">
        <div className="imageContainerProductPage">
          {product.image ? (
            <img
              className="imageProductPage"
              src={`uploads/images/${product.image}`}
              alt="product"
            />
          ) : <p>No image for this product</p>}
        </div>
        <div className="namePriceContainerProductPage">
          <h1 className="productNameProductPage">{product.name}</h1>
          <p className="productDescriptionProductCard descriptionProductPage">
            {product.description}
          </p>
          <h2>{(product.price * productQuantity).toFixed(2)}€</h2>

          {/*     Quantity picker     */}
          <p>Quantity</p>
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
            <p style={{ margin: 0 }}>{productQuantity}</p>
            <p
              onClick={() => setProductQuantity(productQuantity + 1)}
              className="minusPlusProductPage plusProductPage"
            >
              +
            </p>
          </div>
          <div>
            <button
              onClick={addProductToCartPage}
              className="addToCartButtonProductPage"
            >
              ADD TO CART
            </button>
          </div>
          <button
            className="closeButtonProductPage"
            onClick={() => {
              setMoreDetails(false);
              document.body.style.overflow = "auto";
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
