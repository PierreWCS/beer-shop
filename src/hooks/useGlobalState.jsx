import { useContext } from "react";

import { GlobalStateContext } from "../context/GlobalStateContext";

const useGlobalState = () => {
  const [state, dispatch] = useContext(GlobalStateContext);

  // Connection
  const userStateConnect = function connectTheUser(user) {
    dispatch({
      type: "USER_CONNECT",
      payload: {
        user
      }
    });
  };

  // Disconnection
  const userStateDisconnect = function disconnectTheUser() {
    dispatch({ type: "USER_DISCONNECT" });
  };

  // Get the client Cart
  const userCart = function (cart) {
    dispatch({
      type: "USER_MODIFY_CART",
      payload: {
        cart
      }
    })
  };

  return { userStateConnect, userStateDisconnect, user: state.user, userCart, cart: state.cart };
};

export default useGlobalState;
