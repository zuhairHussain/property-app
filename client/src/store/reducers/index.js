import { combineReducers } from 'redux';
import loginReducer from './loginReducer';

const mainReducer = combineReducers({loginReducer});
export default mainReducer;