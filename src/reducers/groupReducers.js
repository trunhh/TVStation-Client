import groupConstants from "../constants/groupConstants";

const initialStateGroup = {
    errorMessageGroup: null,
    listGroups: [],
    totalPagesListGroups: 0,
    updateCompleted: false,
    groupDeleted: false,
    createdGroupSuccessfully: false,
    formGroupIsOpen: false,
    closeFormGroup: false
}


const groupReducer = (state = initialStateGroup, action) => {
    switch(action.type) {
        //List groups
        case groupConstants.GET_LIST_GROUP_SUCCESS:
            return {
                ...state,
                listGroups: action.payload.listGroups,
                totalPagesListGroups: action.payload.totalPagesListGroups
            }
        case groupConstants.GET_LIST_GROUP_FAIL:
            return {
                ...state, 
                errorMessageGroup: action.payload
            }

        //Update group
        case groupConstants.UPDATE_GROUP_SUCCESS:
            return {
                ...state,
                updateCompleted: true,
            }
        case groupConstants.UPDATE_GROUP_FAIL:
            return {
                ...state, 
                errorMessageGroup: action.payload
            }

        //Delete group
        case groupConstants.DELETE_GROUP_REQUEST:
            return {
                ...state,
                groupDeleted: false
            }
        case groupConstants.DELETE_GROUP_SUCCESS:
            return {
                ...state,
                groupDeleted: true,
            }
        case groupConstants.DELETE_GROUP_FAIL:
            return {
                ...state, 
                errorMessageGroup: action.payload
            }

        //Create group
        case groupConstants.CREATE_GROUP_SUCCESS:
            return {
                ...state,
                createdGroupSuccessfully: true,
                closeFormGroup: true
            }
        case groupConstants.CREATE_GROUP_FAIL:
            return {
                ...state,
                 errorMessageGroup: action.payload
            }
        case groupConstants.TOGGLE_FROM_GROUP:
            return {
                ...state,
                formGroupIsOpen: action.payload?.toggleOpenFormGroup ?? !state.formGroupIsOpen,
            };
        default:
            return state
    }
        
}

export default groupReducer;