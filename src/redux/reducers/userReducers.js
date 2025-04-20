import { GET_SUCCEED, UPDATE_SUCCEED } from "../actions/userActions";

const initState = {
    user: null,
}


const userReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_SUCCEED:
        case UPDATE_SUCCEED:
            return {
                ...state,
                user: action.payload,
            };

        default:
            return state;
    }
};

export default userReducer;