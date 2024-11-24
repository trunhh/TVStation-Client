import axios from "axios";

import authConstants from "../constants/authConstants";

const registerUser = (user) => async(dispath) => {
    //console.log(user)
    dispath({
        type: authConstants.REGISTER_USER_REQUEST
    })

    try {
        const response = await axios.post('/api/Auth/SignUp', {
            ...user
        })
        dispath({
            type: authConstants.REGISTER_USER_SUCCESS,
            payload: response.data
        })

        window.location.replace('/sign-in')

    }catch (error) {
        console.log(error)
        dispath({
            type: authConstants.REGISTER_USER_FAIL,
            payload: {
                statusCode: error.response.status,
                message: error.response.data
            }
        })
    }
}

const signin = (username, password) => async(dispath) => {
    dispath({
        type: authConstants.SIGNIN_REQUEST
    })
   
    try {
        const response = await axios.post('/api/Auth/SignIn', {
            username: username,
            password: password
        })

        console.log('response action signin: ')
        console.log(response)

        //Save localStorage
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.userName)
        localStorage.setItem('role', response.data.role)

        dispath({
            type: authConstants.SIGNIN_SUCCESS,
            payload: response.data
        })

        window.location.replace('/')

    }catch (error) {
        console.log(error);
        dispath({
            type: authConstants.SIGNIN_FAIL,
            payload: {
                statusCode: error.response.status,
                message: error.response.data
            }
        })
    }
}

const authActions = {
    registerUser,
    signin
}

export default authActions;
