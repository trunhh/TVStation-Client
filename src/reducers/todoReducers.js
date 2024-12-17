import todoConstants from "../constants/todoConstants";

const initState = {
    list: [],
}


const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case todoConstants.GET_LIST_SUCCEED:
            return {
                ...state,
                list: action.payload,
            };
        default:
            return state;
    }
};

export default todoReducer;