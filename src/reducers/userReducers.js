import userConstants from "../constants/userConstants"

const initialStateUser = {
    user: {
        id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    },
    errorMessage: null,
    errorMessageChangePassword: null,
    messageChangePasswordSuccess: null,
}

const userReducer = (state = initialStateUser, action) => {
    switch(action.type) {
        //Get user info
        case userConstants.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case userConstants.GET_USER_INFO_FAIL:
            return {
                ...state,
                errorMessage: action.payload
            }

        //Update user info
        case userConstants.UPDATE_USER_INFO_SUCCESS:
            return {
                ...state,
            }
        case userConstants.UPDATE_USER_INFO_FAIL:
            return {
                ...state, 
                errorMessage: action.payload
            }

        //Change password
        case userConstants.CHANGE_PASSWORD_REQUEST:
            return {
                ...state, 
                messageChangePasswordSuccess:  null,
                errorMessageChangePassword: null
            }
        case userConstants.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                messageChangePasswordSuccess: 'Your password changed. Please re-active account by click the link which our system has just send to your email.'
            }
        case userConstants.CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                errorMessageChangePassword: action.payload
            }
        default:
            return state
        
    }
}

export default userReducer;