import siteMapConstant from "../constants/siteMapConstant";

const initState = {
    errorMessage: null,
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
            }

        case siteMapConstant.GET_LIST_SUCCEED:
            return {
                ...state,
                list: action.payload,    
                isUpdated: false,
                isDeleted: false,
                isCreated: false
            };

        case siteMapConstant.GET_FAILED:
        case siteMapConstant.GET_LIST_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
            };

        // Update
        case siteMapConstant.UPDATE_SUCCEED:
            return {
                ...state,
                isUpdated: true,
            };

        case siteMapConstant.UPDATE_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
            };

        // Delete
        case siteMapConstant.DELETE_REQUEST:
            return {
                ...state,
                isDeleted: false,
            };

        case siteMapConstant.DELETE_SUCCEED:
            return {
                ...state,
                isDeleted: true,
            };

        case siteMapConstant.DELETE_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
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

        case siteMapConstant.CLEAR_DATA:
            return {
                ...state,
                selected: null,
            };

        // Default case
        default:
            return state;
    }
};

export default siteMapReducer;