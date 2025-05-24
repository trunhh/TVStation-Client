import {
    GET_SUCCEED,
    GET_LIST_SUCCEED,
    UPDATE_SUCCEED,
    CREATE_SUCCEED,
    DELETE_SUCCEED,
    CREATE_FAILED
} from "../actions/channelActions";

const initState = {
    list: [],
    isUpdated: false,
    isDeleted: false,
    isCreated: false
}


const channelReducer = (state = initState, action) => {
    switch (action.type) {
        // get data
        case GET_SUCCEED:
            return {
                ...state,
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
                isUpdated: true,
            };

        // Delete
        case DELETE_SUCCEED:
            return {
                ...state,
                isDeleted: true,
            };
        // Create
        case CREATE_SUCCEED:
            return {
                ...state,
                isCreated: true,
            };

        case CREATE_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
            };

        // Default case
        default:
            return state;
    }
};

export default channelReducer;