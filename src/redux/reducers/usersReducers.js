import {
    GET_SUCCEED,
    GET_LIST_SUCCEED,
    UPDATE_SUCCEED,
    CREATE_SUCCEED
} from "../actions/usersActions";


const initState = {
    user: null,
    list: [],
    isUpdated: false,
    isDeleted: false,
    isCreated: false
}


const usersReducer = (state = initState, action) => {
    switch (action.type) {
        // get data
        case GET_SUCCEED:
            return {
                ...state,
                user: action.payload,
                isUpdated: false,
                isDeleted: false,
                isCreated: false
            }

        case GET_LIST_SUCCEED:
            return {
                ...state,
                list: action.payload,
                isUpdated: false,
                isDeleted: false,
                isCreated: false
            };

        // Update
        case UPDATE_SUCCEED:
            return {
                ...state,
                user: action.payload,
                isUpdated: true,
            };



        // Create
        case CREATE_SUCCEED:
            return {
                ...state,
                user: action.payload,
                isCreated: true,
            };

        // Default case
        default:
            return state;
    }
};

export default usersReducer;