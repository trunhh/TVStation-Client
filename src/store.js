import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import viewReducer from './reducers/viewReducer';
import userReducer from './reducers/userReducers';
import usersReducer from './reducers/usersReducers';
import authReducer from './reducers/authReducers';
import planReducer from './reducers/planReducers';
import siteMapReducer from './reducers/siteMapReducers';
import todoReducer from './reducers/todoReducers';

const rootReducer = combineReducers({
    view: viewReducer,
    user: userReducer,
    users: usersReducer,
    auth: authReducer,
    plan: planReducer,
    siteMap: siteMapReducer,
    todo: todoReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

export default store;

