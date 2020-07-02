import { createStore, compose, applyMiddleware } from "redux";
import logger from 'redux-logger';
//import { rootReducer } from '../ducks/index.js';
import mainReducer from "../reducers/index";

const initialState = {};

const store = createStore(
  mainReducer, initialState,
  compose(
    applyMiddleware(logger), window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
  )
);

export default store;


