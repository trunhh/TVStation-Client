import axios from "axios";


export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
export const SIGNIN_SUCCEED = 'SIGNIN_SUCCEED'
export const SIGNIN_FAILED = 'SIGNIN_FAILED'


const signin = (form) => async(dispatch) => {
    dispatch({
        type: SIGNIN_REQUEST
    })
   
    try {
        const response = await axios.post('https://localhost:7031/api/Auth/SignIn', form)

        console.log(response)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userName', response.data.userName)
        localStorage.setItem('name', response.data.name)
        localStorage.setItem('avatarUrl', response.data.avatarUrl)
        localStorage.setItem('email', response.data.email)
        localStorage.setItem('role', response.data.role)

        dispatch({
            type: SIGNIN_SUCCEED,
            payload: response.data
        })

        window.location.replace('/')

    }catch (error) {
        console.log(error);
        dispatch({
            type: SIGNIN_FAILED,
            payload: error.response
        })
    }
}

const authActions = {
    signin
}

export default authActions;
    