import viewConstants from "../constants/viewConstants";

const initialState = {
    sidebarIsOpen: true,
    formGroupIsOpen: false,
    isLoading: false
};

const viewReducer = (state = initialState, action) => {
    const { type, payload } = action;

    // Generic isLoading logic
    if (type.endsWith('_REQUEST')) {
        return { ...state, isLoading: true };
    } else if (type.endsWith('_SUCCESS') || type.endsWith('_FAIL')) {
        return { ...state, isLoading: false };
    }

    // View-specific logic
    switch (type) {
        case viewConstants.TOGGLE_SIDEBAR:
            return {
                ...state,
                sidebarIsOpen: !state.sidebarIsOpen,
            };

        case viewConstants.TOGGLE_FROM_GROUP:
            return {
                ...state,
                formGroupIsOpen: payload?.toggleOpenFormGroup ?? !state.formGroupIsOpen,
            };

        default:
            return state;
    }
};

export default viewReducer;
