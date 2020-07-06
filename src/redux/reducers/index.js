import { combineReducers } from 'redux';
import * as ducks from '../ducks/index.js';
import batchReducer from './batchReducer';
import credReducer from './credReducer';
import redirectReducer from './redirectReducer'

const mainReducer = combineReducers({
	rootReducer: ducks.rootReducer,
	batchReducer,
	credReducer,
	redirectReducer
});


export default mainReducer;