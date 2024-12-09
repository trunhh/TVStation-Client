import authConstants from "../constants/authConstants";

const initialStateAuth = {
    errorMessage: null,
    userToken: {},
}

const authReducer = (state = initialStateAuth, action) => {
    switch (action.type) {

        //Signin
        case authConstants.SIGNIN_SUCCEED:
            return {
                ...state,
                userToken: action.payload
            }
        case authConstants.SIGNIN_FAILED:
            return {
                ...state, 
                errorMessage: action.payload.data
            }

        default:
            return state;   
    }
}

export default authReducer;