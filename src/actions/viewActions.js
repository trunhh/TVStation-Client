import viewConstants from "../constants/viewConstants"

const toggleSidebar = () => {
    return {
        type: viewConstants.TOGGLE_SIDEBAR,
        payload: null
    }
}

const toggleFormGroup = (isOpen) => {
    return {
        type: viewConstants.TOGGLE_FROM_GROUP,
        payload: {
            toggleOpenFormGroup: isOpen
        }
    }

}

const viewActions = {
    toggleSidebar,
    toggleFormGroup
}

export default viewActions;