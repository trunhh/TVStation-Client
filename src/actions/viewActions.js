import viewConstants from "../constants/viewConstants"

const toggleSidebar = () => {
    return {
        type: viewConstants.TOGGLE_SIDEBAR,
        payload: null
    }
}

const clearErrorMessage = () => {
    return {
        type: viewConstants.CLEAR_ERROR_MESSAGE,
        payload: null
    }
}

const viewActions = {
    toggleSidebar,
    clearErrorMessage
}

export default viewActions;