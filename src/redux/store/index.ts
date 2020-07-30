import { createStore, compose, applyMiddleware } from "redux";
import logger from 'redux-logger';
import mainReducer from "../reducers/index";

const intialState = {}

const store = createStore(
  mainReducer, 
  intialState,
  compose(
    applyMiddleware(logger), window['__REDUX_DEVTOOLS_EXTENSION__']
<<<<<<< HEAD:src/redux/store/index.ts
    ? window['__REDUX_DEVTOOLS_EXTENSION__']()
    : (f: any) => f
=======
    ? window['__REDUX_DEVTOOLS_EXTENSION__()']
    : f => f
>>>>>>> TSX-Conversion:src/redux/store/index.js
  )
);

export default store;