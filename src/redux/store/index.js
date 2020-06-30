import { createStore } from 'redux';
//import { rootReducer } from '../ducks/index.js';
import mainReducer from "../reducers/index";

const store = createStore(mainReducer);

export default store;