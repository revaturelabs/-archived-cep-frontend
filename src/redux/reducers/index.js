import { combineReducers } from 'redux';
import batchReducer from './batchReducer';
import credReducer from './credReducer';
import redirectReducer from './redirectReducer'

const mainReducer = combineReducers({
	batchReducer,
	credReducer,
	redirectReducer
});

export default mainReducer;