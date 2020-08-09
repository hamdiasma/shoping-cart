const {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  FILTER_PRODUCTS_BYP_RICE,
} = require("../../actions/product/types");

const productsReducers = (state = {}, action) => {
  switch (action.type) {
    case FILTER_PRODUCTS_BY_SIZE:
      return {
        ...state,
        size: action.payload.size,
        filtredItems: action.payload.items,
      };
    case FILTER_PRODUCTS_BYP_RICE:
      return {
        ...state,
        sort: action.payload.sort,
        filtredItems: action.payload.items,
      };

    case FETCH_PRODUCTS:
      return {
        items: action.payload,
        filtredItems: action.payload,
      };

    default:
      return state;
  }
};

export default productsReducers;
