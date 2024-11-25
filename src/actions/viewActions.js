import viewConstants from "../constants/viewConstants"

const toggleSidebar = () => {
    return {
        type: viewConstants.TOGGLE_SIDEBAR,
        payload: null
    }
}



const viewActions = {
    toggleSidebar
}

export default viewActions;