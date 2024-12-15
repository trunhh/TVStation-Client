import userConstants from "../constants/userConstants";

const initState = {
    user: null,
}


const userReducer = (state = initState, action) => {
    switch (action.type) {
        case userConstants.GET_SUCCEED:
        case userConstants.UPDATE_SUCCEED:
            return {
                ...state,
                user: action.payload,
            };

        default:
            return state;
    }
};

export default userReducer;