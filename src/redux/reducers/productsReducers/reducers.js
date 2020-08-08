const { FETCH_PRODUCTS } = require("../../actions/product/types");

const INITIAL_STATE = {
  items: [],
};

const productsReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};

export default productsReducers