import { useContext } from "react";

import { GlobalStateContext } from "../context/GlobalStateContext";

const useGlobalState = () => {
  const [state, dispatch] = useContext(GlobalStateContext);

  // Connexion
  const userStateConnect = function connectTheUser(user) {
    dispatch({
      type: "USER_CONNECT",
      payload: {
        user
      }
    });
  };

  // Deconnexion
  const userStateDisconnect = function disconnectTheUser() {
    dispatch({ type: "USER_DISCONNECT" });
  };

  return { userStateConnect, userStateDisconnect, user: state.user };
};

export default useGlobalState;
