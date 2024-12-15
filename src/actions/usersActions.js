import axios from "axios";
import userConstants from "../constants/userConstants";
import { USERS_API } from "../constants/apiConstants";
const token = localStorage.getItem('token');

const get = (userName) => async (dispatch) => {
    dispatch({
        type: userConstants.GET_REQUEST,
    });

    try {
        const response = await axios({
            url: USERS_API + '/' + userName,
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

const getList = () => async (dispatch) => {
    dispatch({
        type: userConstants.GET_LIST_REQUEST,
    });

    try {
        const response = await axios.get(USERS_API, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        dispatch({
            type: userConstants.GET_LIST_SUCCEED,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: userConstants.GET_LIST_FAILED,
            payload: error.response
        });
    }
};

const create = (object) => async (dispatch) => {
    dispatch({
        type: userConstants.CREATE_REQUEST,
    });

    try {
        const response = await axios({
            url: USERS_API,
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(object),
        });

        dispatch({
            type: userConstants.CREATE_SUCCEED,
            payload: response.data,
        });

    } catch (error) {
        dispatch({
            type: userConstants.CREATE_FAILED,
            payload: error.response
        });
    }
};

const update = (object) => async (dispatch) => {
    dispatch({
        type: userConstants.UPDATE_REQUEST,
    });

    try {
        const response = await axios({
            url: USERS_API,
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(object),
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
    getList,
    create,
    update
}