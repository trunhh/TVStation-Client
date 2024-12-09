import axios from "axios";

import authConstants from "../constants/authConstants";


const signin = (form) => async(dispatch) => {
    dispatch({
        type: authConstants.SIGNIN_REQUEST
    })
   
    try {
        const response = await axios.post('/api/Auth/SignIn', form)

        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userName', response.data.userName)
        localStorage.setItem('name', response.data.name)
        localStorage.setItem('avatarUrl', response.data.avatarUrl)
        localStorage.setItem('email', response.data.email)
        localStorage.setItem('role', response.data.role)

        dispatch({
            type: authConstants.SIGNIN_SUCCEED,
            payload: response.data
        })

        window.location.replace('/')

    }catch (error) {
        console.log(error);
        dispatch({
            type: authConstants.SIGNIN_FAILED,
            payload: error.response
        })
    }
}

const authActions = {
    signin
}

export default authActions;
