import { CLEAR_ERROR_MESSAGE } from "../actions/viewActions";

const initialState = {
    loading: 0,
    errorMessage: null
};

const loadingReducer = (state = initialState, action) => {
    const { type, payload } = action;

    // Generic loading logic
    if (type.endsWith('_REQUEST')) {
        return { 
            ...state, 
            loading: state.loading+1,
            errorMessage: null
        };
    }
    else if (type.endsWith('_FAILED')) {
        return {
            ...state,
            loading: state.loading-1,
            errorMessage: payload.data,
        };
    }
    else if (type.endsWith('_SUCCEED')) {
        return { 
            ...state, 
            loading: state.loading-1 ,
            errorMessage: null
        };
    }

    // loading-specific logic
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

export default loadingReducer;
