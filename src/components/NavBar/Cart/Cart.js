import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";
import useGlobalState from "../../../hooks/useGlobalState";
import Axios from "axios";

const Cart = ({
  totalCart,
  setTotalCart,
  clientCart,
  setClientCart,
  totalArticles,
  setTotalArticles
}) => {
  const [orderId, setOrderId] = useState(null);
  const { user } = useGlobalState();
  console.log(user);
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

  const payment = async () => {
    if (user) {
      // First request, send the order infos
      // Get the current date
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      today = mm + "/" + dd + "/" + yyyy;

      const data = {
        orderData: {
          order_date: today,
          order_status: "waiting",
          user_id: user.id
        }
      };
      let newOrderId = 0;
      try {
        await Axios({
          url: "http://localhost:8000/api/orders/order",
          method: "post",
          data: data
        }).then(res => {
          console.log(res);
          newOrderId = res.data.id;
          setOrderId(newOrderId);
        });
      } catch (e) {
        console.log(e);
      }
      try {
        //  Second request, send the customer cart content
        const customerCart = JSON.parse(localStorage.getItem("clientCart"));
        let products = [];
        console.log(newOrderId);
        for (let i = 0; i < customerCart.length; i++) {
          products.push({
            orders_id: newOrderId,
            product_id: customerCart[i].id,
            product_quantity: customerCart[i].quantity,
          })
        }
        console.log(products);
        try {
          for (let i = 0; i < products.length; i++) {
            await Axios({
              url: 'http://localhost:8000/api/orders/item',
              data: products[i],
              method: 'post'
            })
          }
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
      }
    } else alert("You must be connected to proceed to make the purchase");
  };

  const confirmOrder = () => {
    const customerCart = JSON.parse(localStorage.getItem("clientCart"));
    let products = [];
    console.log(orderId);
    for (let i = 0; i < customerCart.length; i++) {
      products.push({
        orders_id: orderId,
        product_id: customerCart[i].id,
        product_quantity: customerCart[i].quantity
      });
    }
    console.log(products);
    Axios({
      url: "http://localhost:8000/api/orders/item",
      data: products,
      method: "post"
    });
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
          <button onClick={payment} className="aboutUsButton navBarButtonCart">
            Payment
          </button>
          {orderId ? <button onClick={confirmOrder}>Confirm</button> : null}
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
