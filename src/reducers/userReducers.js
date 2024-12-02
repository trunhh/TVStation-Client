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
    errorMessageLoadUser: null,
    errorMessageChangePassword: null,
    successMessageChangePassword: null,
}

const userReducer = (state = initialStateUser, action) => {
    switch(action.type) {
        //Get user info
        case userConstants.GET_SUCCEED:
            return {
                ...state,
                user: action.payload
            }
        case userConstants.GET_FAILED:
            return {
                ...state,
                errorMessageLoadUser: action.payload
            }

        //Update user info
        case userConstants.UPDATE_SUCCEED:
            return {
                ...state,
            }
        case userConstants.UPDATE_FAILED:
            return {
                ...state, 
                errorMessageLoadUser: action.payload
            }

        //Change password
        case userConstants.CHANGE_PASSWORD_REQUEST:
            return {
                ...state, 
                successMessageChangePassword:  null,
                errorMessageChangePassword: null
            }
        case userConstants.CHANGE_PASSWORD_SUCCEED:
            return {
                ...state,
                successMessageChangePassword: 'Your password changed. Please re-active account by click the link which our system has just send to your email.'
            }
        case userConstants.CHANGE_PASSWORD_FAILED:
            return {
                ...state,
                errorMessageChangePassword: action.payload
            }
        default:
            return state
        
    }
}

export default userReducer;