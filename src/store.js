import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import viewReducer from './reducers/viewReducer';
import userReducer from './reducers/userReducers';
import authReducer from './reducers/authReducers';
import groupReducer from './reducers/groupReducers';
import planReducer from './reducers/planReducers';
import siteMapReducer from './reducers/siteMapReducers';

const rootReducer = combineReducers({
    view: viewReducer,
    user: userReducer,
    auth: authReducer,
    group: groupReducer,
    plan: planReducer,
    siteMap: siteMapReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

export default store;

