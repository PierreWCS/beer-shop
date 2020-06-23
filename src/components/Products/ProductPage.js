import React, { useState } from "react";
import "./ProductPage.css";
import useGlobalState from "../../hooks/useGlobalState";
import PopUp from "../Popups/PopUp";

const ProductPage = ({ product, setMoreDetails }) => {
  const [productQuantity, setProductQuantity] = useState(1);
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const { userCart, cart } = useGlobalState();

  const addProductToCartPage = () => {
    let stockCart = cart;
    if (stockCart && stockCart.length > 0) {
      const idStockCart = stockCart.map((product) => product.id);
      if (idStockCart.includes(product.id)) {
        for (let i = 0; i < stockCart.length; i++) {
          if (stockCart[i].id === product.id) {
            stockCart[i].quantity = stockCart[i].quantity + productQuantity;
            userCart(stockCart);
          }
        }
      } else {
        product.quantity = productQuantity;
        stockCart.push(product);
      }
      userCart(stockCart);
    } else {
      let cartInit = [];
      cartInit.push(product);
      userCart(cartInit);
    }
    setDisplayPopUp(true);
    setInterval(() => {
      document.body.style.overflow = "auto";
      setMoreDetails(false);
    }, 3000)

  };

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
          ) : (
            <p>No image for this product</p>
          )}
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
      {displayPopUp ? (
        <PopUp
          setDisplay={setDisplayPopUp}
          message="Product has been added to your cart"
          timeout="3000"
          type="cart add"
        />
      ) : null}
    </div>
  );
};

export default ProductPage;
