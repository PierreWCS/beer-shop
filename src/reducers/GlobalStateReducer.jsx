const GlobalStateReducer = (state, action) => {
  switch (action.type) {
    case "USER_CONNECT":
      return {
        ...state,
        user: action.payload.user
      };
    case "USER_DISCONNECT":
      return {
        ...state,
        user: null
      };
    case "USER_MODIFY_CART":
      return {
        ...state,
        cart: action.payload.cart
      };
    default:
      return state;
  }
};

export default GlobalStateReducer;
