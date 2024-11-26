import authConstants from "../constants/authConstants";

const initialStateAuth = {
    errorMessageRegister: null,
    errorMessageSignin: null,
    userToken: {},
}

const authReducer = (state = initialStateAuth, action) => {
    switch (action.type) {
        //Register user
        case authConstants.REGISTER_USER_SUCCEED:
            return {
                ...state,
                userToken: action.payload
            }
        case authConstants.REGISTER_USER_FAILED:
            return {
                ...state, 
                errorMessageRegister: action.payload.message
            }

        //Signin
        case authConstants.SIGNIN_SUCCEED:
            return {
                ...state,
                userToken: action.payload
            }
        case authConstants.SIGNIN_FAILED:
            return {
                ...state, 
                errorMessageSignin: action.payload.message
            }

        default:
            return state;   
    }
}

export default authReducer;