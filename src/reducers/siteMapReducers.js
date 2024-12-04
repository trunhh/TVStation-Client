import siteMapConstant from "../constants/siteMapConstant";

const initState = {
    list: [],
    isUpdated: false,
    isDeleted: false,
    isCreated: false
}


const siteMapReducer = (state = initState, action) => {
    switch (action.type) {
        // get data
        case siteMapConstant.GET_SUCCEED:
            return {
                ...state,
                isUpdated: false,
                isDeleted: false,
                isCreated: false
            }

        case siteMapConstant.GET_LIST_SUCCEED:
            return {
                ...state,
                list: action.payload,    
                isUpdated: false,
                isDeleted: false,
                isCreated: false
            };

        // Update
        case siteMapConstant.UPDATE_SUCCEED:
            return {
                ...state,
                isUpdated: true,
            };

        // Delete
        case siteMapConstant.DELETE_SUCCEED:
            return {
                ...state,
                isDeleted: true,
            };
        // Create
        case siteMapConstant.CREATE_SUCCEED:
            return {
                ...state,
                isCreated: true,
            };

        case siteMapConstant.CREATE_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
            };

        // Default case
        default:
            return state;
    }
};

export default siteMapReducer;