import React, {useEffect, useState} from 'react';
import './Cart.css';
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Cart = () => {
  const [clientCart, setClientCart] = useState(null);

  useEffect(() => {
    getClientCart();
  }, []);

  const getClientCart = () => {
    let stockCart = JSON.parse(localStorage.getItem("clientCart"));
    console.log(stockCart);
    setClientCart(stockCart);
  };

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
              return (
                <div className="productCardCartMobile">
                  <p>{product.name}</p>
                  <p>{product.price}</p>
                  <FontAwesomeIcon
                    onClick={() => deleteProduct(product)}
                    className="deleteItemFromCart"
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
              <p>Total price: </p>
            </div>
            : null
        }
      </div>
    </div>
  )
};

export default Cart;
