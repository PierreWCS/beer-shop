import React, { createContext, useReducer } from "react";

import GlobalStateReducer from "../reducers/GlobalStateReducer";

/* Define a context and a reducer for updating the context */
export const GlobalStateContext = createContext(null);

const initialState = {
  user: null,
  cart: null
};

const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
