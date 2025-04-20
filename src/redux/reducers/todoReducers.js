import { GET_LIST_SUCCEED } from "../actions/todoActions";

const initState = {
    list: [],
}


const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_LIST_SUCCEED:
            return {
                ...state,
                list: action.payload,
            };
        default:
            return state;
    }
};

export default todoReducer;