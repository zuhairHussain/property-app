import { combineReducers } from 'redux';
import authReducer from './authReducer';
import loaderReducer from './loaderReducer';

const reducers = combineReducers({
    authReducer,
    loaderReducer
});

export default reducers;