import { combineReducers } from 'redux';
import gistReducer from './gistReducer';
import forkReducer from './forkReducer';

const mainReducer = combineReducers({gistReducer, forkReducer});
export default mainReducer;