export const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE'

const clearErrorMessage = () => {
    return {
        type: CLEAR_ERROR_MESSAGE,
        payload: null
    }
}

const viewActions = {
    clearErrorMessage
}

export default viewActions;