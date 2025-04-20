import { SIGNIN_SUCCEED, SIGNIN_FAILED } from "../actions/authActions"

const initialStateAuth = {
    errorMessage: null,
    userToken: {},
}

const authReducer = (state = initialStateAuth, action) => {
    switch (action.type) {

        //Signin
        case SIGNIN_SUCCEED:
            return {
                ...state,
                userToken: action.payload
            }
        case SIGNIN_FAILED:
            return {
                ...state, 
                errorMessage: action.payload.data
            }

        default:
            return state;   
    }
}

export default authReducer;