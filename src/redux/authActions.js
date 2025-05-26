import axios from "axios";


export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
export const SIGNIN_SUCCEED = 'SIGNIN_SUCCEED'
export const SIGNIN_FAILED = 'SIGNIN_FAILED'
export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
export const CHANGE_PASSWORD_SUCCEED = 'CHANGE_PASSWORD_SUCCEED'
export const CHANGE_PASSWORD_FAILED = 'CHANGE_PASSWORD_FAILED'

const token = localStorage.getItem('token');

export const signin = (form) => async(dispatch) => {
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
        localStorage.setItem('siteMapName', response.data.siteMapName)

        dispatch({
            type: SIGNIN_SUCCEED,
            payload: response.data
        })

        window.location.replace('/')

    }catch (error) {
        console.log(error);
        alert(error)
        dispatch({
            type: SIGNIN_FAILED,
            payload: error.response
        })
    }
}

export const updatePassword = (formData) => async (dispatch) => {
    dispatch({
        type: UPDATE_REQUEST,
    });

    try {
        const response = await axios({
            url: 'https://localhost:7031/api/Auth/Password',
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(formData),
        });

        dispatch({
            type: UPDATE_SUCCEED,
            payload: response.data,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_FAILED,
            payload: error.response
        });
    }
};