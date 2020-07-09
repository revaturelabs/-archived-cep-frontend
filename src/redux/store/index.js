import { createStore, compose, applyMiddleware } from "redux";
import logger from 'redux-logger';
import mainReducer from "../reducers/index";

const intialState = {}

const store = createStore(
  mainReducer, 
  intialState,
  compose(
    applyMiddleware(logger), window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
  )
);

export default store;