import planConstant from "../constants/planConstant";

const initState = {
    errorMessage: null,
    selected: null,
    list: [],
    pageCount: 0,
    totalCount: 0,
    inProgressCount: 0,
    waitingApprovalCount: 0,
    approvedCount: 0,
    isUpdated: false,
    isDeleted: false,
    isCreated: false
}


const planReducer = (state = initState, action) => {
    switch (action.type) {
        // get data
        case planConstant.GET_SUCCEED:
            return {
                ...state,
                ...action.payload,
            }

        case planConstant.GET_LIST_SUCCEED:
            return {
                ...state,
                ...action.payload,    
                isUpdated: false,
                isDeleted: false,
                isCreated: false
            };

        case planConstant.GET_FAILED:
        case planConstant.GET_LIST_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
            };

        // Update
        case planConstant.UPDATE_SUCCEED:
            return {
                ...state,
                isUpdated: true,
            };

        case planConstant.UPDATE_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
            };

        // Delete
        case planConstant.DELETE_REQUEST:
            return {
                ...state,
                isDeleted: false,
            };

        case planConstant.DELETE_SUCCEED:
            return {
                ...state,
                isDeleted: true,
            };

        case planConstant.DELETE_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
            };

        // Create
        case planConstant.CREATE_SUCCEED:
            return {
                ...state,
                isCreated: true,
            };

        case planConstant.CREATE_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
            };

        case planConstant.CLEAR_DATA:
            return {
                ...state,
                selected: null,
            };

        // Default case
        default:
            return state;
    }
};

export default planReducer;