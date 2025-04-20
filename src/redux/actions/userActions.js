import axios from "axios";
import { USER_API } from "../../constants/apiConstants";

export const GET_REQUEST = 'USER_GET_REQUEST'
export const GET_SUCCEED = 'USER_GET_SUCCEED'
export const GET_FAILED =  'USER_GET_FAILED'
export const UPDATE_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_SUCCEED = 'UPDATE_USER_SUCCEED'
export const UPDATE_FAILED = 'UPDATE_USER_FAILED'
export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
export const CHANGE_PASSWORD_SUCCEED = 'CHANGE_PASSWORD_SUCCEED'
export const CHANGE_PASSWORD_FAILED = 'CHANGE_PASSWORD_FAILED'


const token = localStorage.getItem('token');

const get = () => async (dispatch) => {
    dispatch({
        type: GET_REQUEST,
    });

    try {
        const response = await axios({
            url: USER_API,
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });

        dispatch({
            type: GET_SUCCEED,
            payload: response.data,
        });

    } catch (error) {
        dispatch({
            type: GET_FAILED,
            payload: error.response
        });
    }
};

const update = (formData) => async (dispatch) => {
    dispatch({
        type: UPDATE_REQUEST,
    });

    try {
        const response = await axios({
            url: USER_API,
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(formData),
        });

        localStorage.setItem('name', response.data.name)
        localStorage.setItem('avatarUrl', response.data.avatarUrl)
        localStorage.setItem('email', response.data.email)
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

const updatePassword = (formData) => async (dispatch) => {
    dispatch({
        type: UPDATE_REQUEST,
    });

    try {
        const response = await axios({
            url: USER_API + "/Password",
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


export default {
    get,
    update,
    updatePassword
}