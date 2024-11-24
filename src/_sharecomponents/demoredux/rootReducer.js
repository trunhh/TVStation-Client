import { combineReducers } from "redux";
import countReducer from "./countReducer";

const rootReducer = combineReducers({
    //countReducer
    count: countReducer
})

export default rootReducer;