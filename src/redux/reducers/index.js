import { combineReducers } from 'redux';
import * as ducks from '../ducks/index.js';
import batchReducer from './batchReducer';
import credReducer from './credReducer';



const mainReducer = combineReducers({
	rootReducer: ducks.rootReducer,
	batchReducer,
	credReducer
});


export default mainReducer;