import { createStore, applyMiddleware, compose } from 'redux';
import mainReducer from './reducers';
import thunkMiddleware from 'redux-thunk';

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(mainReducer,enhancers(applyMiddleware(thunkMiddleware)));
export default store;