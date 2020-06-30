import { combineReducers } from 'redux';
import * as ducks from '../ducks/index.js';
import batchReducer from './batchReducer';


const mainReducer = combineReducers({
	rootReducer: ducks.rootReducer,
	batchReducer,
});


export default mainReducer;