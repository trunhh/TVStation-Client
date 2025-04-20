import { CLEAR_ERROR_MESSAGE } from "../actions/viewActions";

const initialState = {
    isLoading: false,
    errorMessage: null
};

const viewReducer = (state = initialState, action) => {
    const { type, payload } = action;

    // Generic isLoading logic
    if (type.endsWith('_REQUEST')) {
        return { 
            ...state, 
            isLoading: true,
            errorMessage: null
        };
    }
    else if (type.endsWith('_FAILED')) {
        return {
            ...state,
            isLoading: false,
            errorMessage: payload.data,
        };
    }
    else if (type.endsWith('_SUCCEED')) {
        return { 
            ...state, 
            isLoading: false ,
            errorMessage: null
        };
    }

    // View-specific logic
    switch (type) {
        case CLEAR_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: null
            }

        

        default:
            return state;
    }
};

export default viewReducer;
