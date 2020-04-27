import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";

const Cart = ({
  totalCart,
  setTotalCart,
  clientCart,
  setClientCart,
  totalArticles,
  setTotalArticles
}) => {
  const minusQuantity = product => {
    let stockCart = clientCart;
    stockCart.map((element, index) => {
      if (element.id === product.id) {
        if (element.quantity > 1) {
          element.quantity -= 1;
        }
      }
      setClientCart([...stockCart]);
      localStorage.setItem("clientCart", JSON.stringify(stockCart));
      getTotalPrice();
      getTotalArticle();
      return 0;
    });
  };

  const plusQuantity = product => {
    let stockCart = clientCart;
    stockCart.map(element => {
      if (element.id === product.id) {
        element.quantity += 1;
      }
      setClientCart([...stockCart]);
      localStorage.setItem("clientCart", JSON.stringify(stockCart));
      getTotalPrice();
      getTotalArticle();
      return 0;
    });
  };

  const deleteProduct = product => {
    let removedProduct = clientCart.filter(e => e.id !== product.id);
    setClientCart([...removedProduct]);
    localStorage.setItem("clientCart", JSON.stringify(removedProduct));
    let countPrice = 0;
    removedProduct.filter(product => {
      return (countPrice = countPrice + product.price * product.quantity);
    });
    setTotalCart(countPrice.toFixed(2));
    let countArticles = 0;
    removedProduct.filter(product => {
      return (countArticles = countArticles + product.quantity);
    });
    setTotalArticles(countArticles);
  };

  const getTotalPrice = () => {
    let count = 0;
    clientCart.filter(product => {
      return (count = count + product.price * product.quantity);
    });
    setTotalCart(count.toFixed(2));
  };

  const getTotalArticle = () => {
    let count = 0;
    clientCart.filter(product => {
      return (count = count + product.quantity);
    });
    setTotalArticles(count);
  };

  return (
    <div className="cartContainerNavBar">
      <h4>Your cart</h4>
      <hr className="separatorCart" />
      <div className={clientCart ? "productsContainerCart" : null}>
        {clientCart
          ? clientCart.map((product, key) => {
              return (
                <div className="cartProductCard" key={key}>
                  <div className="quantityContainer">
                    <p
                      onClick={() => minusQuantity(product)}
                      className={`minusAndPlusCart minusCart ${
                        product.quantity === 1 ? "disableMinus" : null
                      }`}
                    >
                      -
                    </p>
                    <p>{product.quantity}x</p>
                    <p
                      onClick={() => plusQuantity(product)}
                      className="minusAndPlusCart plusCart"
                    >
                      +
                    </p>
                  </div>
                  <p className="productPriceAndNameCart">{product.name}</p>
                  <div className="closeAndPriceCart">
                    <p className="productPriceAndNameCart">
                      {(product.price * product.quantity).toFixed(2)} €
                    </p>
                    <FontAwesomeIcon
                      onClick={() => deleteProduct(product)}
                      className="deleteItemFromCart"
                      icon={faWindowClose}
                    />
                  </div>
                </div>
              );
            })
          : null}
      </div>
      {clientCart && clientCart.length ? (
        <div>
          <p className="totalCartCounter">
            Total price:{" "}
            <span className="totalCounterNumberCart">{totalCart}</span> €
          </p>
          <p className="totalCartCounter">
            Total of articles:{" "}
            <span className="totalCounterNumberCart">{totalArticles}</span>
          </p>
          <button className="aboutUsButton navBarButtonCart">Payment</button>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
