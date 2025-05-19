import {
    GET_SUCCEED,
    GET_LIST_SUCCEED,
    UPDATE_SUCCEED,
    CREATE_SUCCEED,
    DELETE_SUCCEED,
} from "../actions/planActions";



const initState = {
    selected: null,
    eventList: [],
    channelList: [],
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
        case GET_SUCCEED:
            return {
                ...state,
                selected: action.payload,
                isUpdated: false,
                isDeleted: false,
                isCreated: false
            }

        case GET_LIST_SUCCEED:
            console.log(action.payload)
            return {
                ...state,
                ...action.payload,
                selected: null, 
                isUpdated: false,
                isDeleted: false,
                isCreated: false
            };

        // Update
        case UPDATE_SUCCEED:
            return {
                ...state,
                selected: action.payload,
                isUpdated: true,
            };


        case DELETE_SUCCEED:
            return {
                ...state,
                isDeleted: true,
            };  

        // Create
        case CREATE_SUCCEED:
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