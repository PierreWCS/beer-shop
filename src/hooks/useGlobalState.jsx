import { useContext } from "react";

import { GlobalStateContext } from "../context/GlobalStateContext";

const useGlobalState = () => {
  const [state, dispatch] = useContext(GlobalStateContext);

  // Connection
  const userStateConnect = function connectTheUser(user) {
    dispatch({
      type: "USER_CONNECT",
      payload: {
        user,
      },
    });
  };

  // Disconnection
  const userStateDisconnect = function disconnectTheUser() {
    dispatch({ type: "USER_DISCONNECT" });
  };

  // Get the client Cart
  const userCart = function (cart) {
    if (cart) {
      // Total cart price
      let countPrice = 0;
      cart.filter((product) => {
        return (countPrice = countPrice + product.price * product.quantity);
      });
      cart.total_price = countPrice.toFixed(2);

      //  Total number of articles
      let countArticles = 0;
      cart.filter((product) => {
        return (countArticles = countArticles + product.quantity);
      });
      cart.total_articles = countArticles;
    }

    dispatch({
      type: "USER_MODIFY_CART",
      payload: {
        cart,
      },
    });
    localStorage.setItem("clientCart", JSON.stringify(cart));
  };

  return {
    userStateConnect,
    userStateDisconnect,
    user: state.user,
    userCart,
    cart: state.cart,
  };
};

export default useGlobalState;
