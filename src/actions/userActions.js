import axios from "axios";
import userConstants from "../constants/userConstants";
import { USER_API } from "../constants/apiConstants";
const token = localStorage.getItem('token');

const get = () => async (dispatch) => {
    dispatch({
        type: userConstants.GET_REQUEST,
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
            type: userConstants.GET_SUCCEED,
            payload: response.data,
        });

    } catch (error) {
        dispatch({
            type: userConstants.GET_FAILED,
            payload: error.response
        });
    }
};

const update = (formData) => async (dispatch) => {
    dispatch({
        type: userConstants.UPDATE_REQUEST,
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
            type: userConstants.UPDATE_SUCCEED,
            payload: response.data,
        });

    } catch (error) {
        dispatch({
            type: userConstants.UPDATE_FAILED,
            payload: error.response
        });
    }
};

const updatePassword = (formData) => async (dispatch) => {
    dispatch({
        type: userConstants.UPDATE_REQUEST,
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
            type: userConstants.UPDATE_SUCCEED,
            payload: response.data,
        });

    } catch (error) {
        dispatch({
            type: userConstants.UPDATE_FAILED,
            payload: error.response
        });
    }
};


export default {
    get,
    update,
    updatePassword
}