const { ADD_TO_CART, REMOVE_FROM_CART } = require("../../actions/cart/types");

const cartReducers = (
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };

    default:
      return state;
  }
};

export default cartReducers;
