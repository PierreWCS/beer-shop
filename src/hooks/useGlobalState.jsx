import { useContext } from "react";

import { GlobalStateContext } from "../context/GlobalStateContext";

const useGlobalState = () => {
  const [state, dispatch] = useContext(GlobalStateContext);

  // Get the client Cart
  const userCart = function (cart) {
    dispatch({
      payload: {
        cart
      }
    })
  };

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

  return { userStateConnect, userStateDisconnect, user: state.user, userCart };
};

export default useGlobalState;
