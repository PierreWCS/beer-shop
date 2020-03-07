import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import './Cart.css';

const Cart = ({ clientCart, setClientCart, totalCart, setTotalCart }) => {

  const minusQuantity = ( product ) => {
    let stockCart = clientCart;
    stockCart.map((element) => {
      if (element.id === product.id) {
        element.quantity = element.quantity - 1;
      }
    });
    setClientCart(stockCart);
  };

  const deleteProduct = product => {
    let removedProduct = clientCart.filter(e => e.id !== product.id);
    localStorage.setItem("clientCart", JSON.stringify(removedProduct));
    setClientCart(removedProduct);
    let count = 0;
    let total = removedProduct.filter(product => {
      return (count = count + product.price * product.quantity);
    });
    setTotalCart(count.toFixed(2));
  };

  return (
    <div className="cartContainerNavBar">
      <h2>Your cart</h2>
      <hr className="separatorCart" />
      <div className="productsContainerCart">
        {clientCart
          ? clientCart.map(product => {
            return (
              <div className="cartProductCard">
                <div className="quantityContainer">
                  <p className="minusAndPlusCart minusCart">-</p>
                  <p>{product.quantity}x</p>
                  <p className="minusAndPlusCart plusCart">+</p>
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
      {clientCart.length ? (
        <div>
          <p>Total price: {totalCart} €</p>
          <button className="aboutUsButton navBarButtonCart">Payment</button>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
