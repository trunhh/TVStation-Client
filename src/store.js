import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import viewReducer from './redux/reducers/viewReducer';
import userReducer from './redux/reducers/userReducers';
import usersReducer from './redux/reducers/usersReducers';
import authReducer from './redux/reducers/authReducers';
import planReducer from './redux/reducers/planReducers';
import siteMapReducer from './redux/reducers/siteMapReducers';
import todoReducer from './redux/reducers/todoReducers';
import channelReducer from './redux/reducers/channelReducers';

const rootReducer = combineReducers({
    view: viewReducer,
    user: userReducer,
    users: usersReducer,
    auth: authReducer,
    plan: planReducer,
    siteMap: siteMapReducer,
    channel: channelReducer,
    todo: todoReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

export default store;

