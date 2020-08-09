import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import productsReducers from "./reducers/productsReducers/reducers";
import cartReducers from "./reducers/cartReducers/reducer";

const initialState = {};
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENTION_COMPOSE_ || compose;
const store = createStore(
  combineReducers({
    products: productsReducers,
    cart:cartReducers
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
