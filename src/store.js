import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import loadingReducer from './redux/loadingReducer';
import { programmeReducer, episodeReducer, siteMapReducer, channelReducer, userReducer } from './redux/reduxes';


const rootReducer = combineReducers({
    loading: loadingReducer,
    user: userReducer,
    programme: programmeReducer,
    siteMap: siteMapReducer,
    channel: channelReducer,
    todo: todoReducer,
    episode: episodeReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

export default store;

