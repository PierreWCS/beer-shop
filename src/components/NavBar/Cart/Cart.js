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
        } else {
          console.log("no");
        }
      }
      setClientCart([...stockCart]);
      localStorage.setItem("clientCart", JSON.stringify(stockCart));
      getTotalPrice();
      getTotalArticle();
    });
  };

  const plusQuantity = product => {
    let stockCart = clientCart;
    stockCart.map(element => {
      if (element.id === product.id) {
        element.quantity += 1;
      } else {
        console.log("no");
      }
      setClientCart([...stockCart]);
      localStorage.setItem("clientCart", JSON.stringify(stockCart));
      getTotalPrice();
      getTotalArticle();
    });
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

  const deleteProduct = product => {
    let removedProduct = clientCart.filter(e => e.id !== product.id);
    localStorage.setItem("clientCart", JSON.stringify(removedProduct));
    setClientCart(removedProduct);
    let count = 0;
    removedProduct.filter(product => {
      return (count = count + product.price * product.quantity);
    });
    setTotalCart(count.toFixed(2));
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
          <p className="totalCartCounter">Total price: {totalCart} €</p>
          <p className="totalCartCounter">Total of articles: {totalArticles}</p>
          <button className="aboutUsButton navBarButtonCart">Payment</button>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
