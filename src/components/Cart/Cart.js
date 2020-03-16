import React, {useEffect, useState} from 'react';
import './Cart.css';
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

const Cart = () => {
  const [clientCart, setClientCart] = useState(null);
  const [totalCart, setTotalCart] = useState(0);

  useEffect(() => {
    getClientCart();
  }, []);

  const getClientCart = () => {
    let stockCart = JSON.parse(localStorage.getItem("clientCart"));
    console.log(stockCart);
    setClientCart(stockCart);
  };

  let stock = 0;

  const deleteProduct = product => {
    let removedProduct = clientCart.filter(e => e.id !== product.id);
    localStorage.setItem("clientCart", JSON.stringify(removedProduct));
    setClientCart(removedProduct);
  };

  return (
    <div className="cartContainerMobile">
      <h1 className="cartTitleMobile">CART</h1>
      <div className="productsContainerCartMobile">
        {
          clientCart ?
            clientCart.map((product) => {
              stock += (product.price * product.quantity);
              return (
                <div className="productCardCartMobile">
                  <p className="productNameCartMobile">{product.name}</p>
                  <p className="productPriceCartMobile">{product.price}</p>
                  <FontAwesomeIcon
                    onClick={() => deleteProduct(product)}
                    className="deleteItemFromCart deleteCartMobile fa-2x"
                    icon={faWindowClose}
                  />
                </div>
              )
            })
            : <p>Your cart is empty</p>
        }
        {
          clientCart ?
            <div>
              <p>Total quantity: {clientCart.length}</p>
              <p>Total price: {stock.toFixed(2)} €</p>
              <div className="buttonContainerCart">
                <button className="aboutUsButton buttonCartMobile">Payment</button>
                <Link to="/" className="aboutUsButton buttonBackToSiteCart">Back to the site</Link>
              </div>
            </div>
            : null
        }
      </div>
    </div>
  )
};

export default Cart;
