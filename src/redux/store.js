import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import productsReducers from "./reducers/productsReducers/reducers";

const initialState = {};
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENTION_COMPOSE_ || compose;
const store = createStore(
  combineReducers({
    products: productsReducers,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
