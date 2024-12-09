import planConstant from "../constants/planConstant";

const initState = {
    selected: null,
    list: [],
    pageIndex: 1,
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
                selected: action.payload,
                isUpdated: false,
                isDeleted: false,
                isCreated: false
            }

        case planConstant.GET_LIST_SUCCEED:
            return {
                ...state,
                ...action.payload,
                selected: null, 
                isUpdated: false,
                isDeleted: false,
                isCreated: false
            };

        // Update
        case planConstant.UPDATE_SUCCEED:
            return {
                ...state,
                selected: action.payload,
                isUpdated: true,
            };


        case planConstant.DELETE_SUCCEED:
            return {
                ...state,
                isDeleted: true,
            };  

        // Create
        case planConstant.CREATE_SUCCEED:
            return {
                ...state,
                selected: action.payload,
                isCreated: true,
            };

        // Default case
        default:
            return state;
    }
};

export default planReducer;