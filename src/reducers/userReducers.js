import userConstants from "../constants/userConstants";

const initState = {
    user: null,
    list: [],
    isUpdated: false,
    isDeleted: false,
    isCreated: false
}


const userReducers = (state = initState, action) => {
    switch (action.type) {
        // get data
        case userConstants.GET_SUCCEED:
            return {
                ...state,
                user: action.payload,
                isUpdated: false,
                isDeleted: false,
                isCreated: false
            }

        case userConstants.GET_LIST_SUCCEED:
            return {
                ...state,
                list: action.payload,
                isUpdated: false,
                isDeleted: false,
                isCreated: false
            };

        // Update
        case userConstants.UPDATE_SUCCEED:
            return {
                ...state,
                user: action.payload,
                isUpdated: true,
            };



        // Create
        case userConstants.CREATE_SUCCEED:
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

export default userReducers;