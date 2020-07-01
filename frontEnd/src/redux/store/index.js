import { createStore } from 'redux';
import { rootReducer } from '../ducks/index.js';

const store = createStore(rootReducer);

export default store;