const initialState = {
    loading: 0,
};

const loadingReducer = (state = initialState, action) => {
    const { type } = action;

    // Generic loading logic
    if (type.endsWith('_REQUEST')) {
        return { 
            ...state, 
            loading: state.loading+1,
        };
    }
    else if (type.endsWith('_FAILED')) {
        return {
            ...state,
            loading: state.loading-1,
        };
    }
    else if (type.endsWith('_SUCCEED')) {
        return { 
            ...state, 
            loading: state.loading-1 ,
        };
    }
    else return state;
};

export default loadingReducer;
