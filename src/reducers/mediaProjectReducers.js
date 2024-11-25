import mediaProjectConstant from "../constants/mediaProjectConstant";

const initialStateMediaProject = {
    errorMessageLoadMediaProject: null,
    mediaProjects: [],
    totalPagesMediaProject: 0,
    mediaProjectUpdated: false,
    mediaProjectDeleted: false,
    mediaProjectCreated: false,
    mediaProjectFormOpened: false,
    mediaProjectFormClosed: false
}


const mediaProjectReducer = (state = initialStateMediaProject, action) => {
    switch(action.type) {
        //List mediaProjects
        case mediaProjectConstant.GET_LIST_MEDIA_PROJECT_SUCCESS:
            return {
                ...state,
                mediaProjects: action.payload.mediaProjects,
                totalPagesMediaProject: action.payload.totalPagesMediaProject
            }
        case mediaProjectConstant.GET_LIST_MEDIA_PROJECT_FAIL:
            return {
                ...state, 
                errorMessageLoadMediaProject: action.payload
            }

        //Update mediaProject
        case mediaProjectConstant.UPDATE_MEDIA_PROJECT_SUCCESS:
            return {
                ...state,
                mediaProjectUpdated: true,
            }
        case mediaProjectConstant.UPDATE_MEDIA_PROJECT_FAIL:
            return {
                ...state, 
                errorMessageLoadMediaProject: action.payload
            }

        //Delete mediaProject
        case mediaProjectConstant.DELETE_MEDIA_PROJECT_REQUEST:
            return {
                ...state,
                mediaProjectDeleted: false
            }
        case mediaProjectConstant.DELETE_MEDIA_PROJECT_SUCCESS:
            return {
                ...state,
                mediaProjectDeleted: true,
            }
        case mediaProjectConstant.DELETE_MEDIA_PROJECT_FAIL:
            return {
                ...state, 
                errorMessageLoadMediaProject: action.payload
            }

        //Create mediaProject
        case mediaProjectConstant.CREATE_MEDIA_PROJECT_SUCCESS:
            return {
                ...state,
                mediaProjectCreated: true,
                mediaProjectFormClosed: true
            }
        case mediaProjectConstant.CREATE_MEDIA_PROJECT_FAIL:
            return {
                ...state,
                errorMessageLoadMediaProject: action.payload
            }
        case mediaProjectConstant.TOGGLE_MEDIA_PROJECT_FORM:
            return {
                ...state,
                mediaProjectFormOpened: action.payload?.toggleMediaProjectForm ?? !state.mediaProjectFormOpened,
            };
        default:
            return state
    }
        
}

export default mediaProjectReducer;