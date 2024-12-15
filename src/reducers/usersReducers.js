import usersConstants from "../constants/usersConstants";

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
        case usersConstants.GET_SUCCEED:
            return {
                ...state,
                user: action.payload,
                isUpdated: false,
                isDeleted: false,
                isCreated: false
            }

        case usersConstants.GET_LIST_SUCCEED:
            return {
                ...state,
                list: action.payload,
                isUpdated: false,
                isDeleted: false,
                isCreated: false
            };

        // Update
        case usersConstants.UPDATE_SUCCEED:
            return {
                ...state,
                user: action.payload,
                isUpdated: true,
            };



        // Create
        case usersConstants.CREATE_SUCCEED:
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