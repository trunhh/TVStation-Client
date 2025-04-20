import axios from "axios";
import { USERS_API } from "../../constants/apiConstants";

export const GET_REQUEST = 'USERS_GET_REQUEST'
export const GET_SUCCEED = 'USERS_GET_SUCCEED'
export const GET_FAILED =  'USERS_GET_FAILED'
export const GET_LIST_REQUEST = 'USERS_GET_LIST_REQUEST'
export const GET_LIST_SUCCEED = 'USERS_GET_LIST_SUCCEED'
export const GET_LIST_FAILED =  'USERS_GET_LIST_FAILED'
export const CREATE_REQUEST = 'USERS_CREATE_REQUEST'
export const CREATE_SUCCEED = 'USERS_CREATE_SUCCEED'
export const CREATE_FAILED =  'USERS_CREATE_FAILED'
export const UPDATE_REQUEST = 'UPDATES_USER_REQUEST'
export const UPDATE_SUCCEED = 'UPDATES_USER_SUCCEED'
export const UPDATE_FAILED = 'UPDATES_USER_FAILED'

const token = localStorage.getItem('token');

const get = (userName) => async (dispatch) => {
    dispatch({
        type: GET_REQUEST,
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

const getList = () => async (dispatch) => {
    dispatch({
        type: GET_LIST_REQUEST,
    });

    try {
        const response = await axios.get(USERS_API, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        dispatch({
            type: GET_LIST_SUCCEED,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_LIST_FAILED,
            payload: error.response
        });
    }
};

const create = (object) => async (dispatch) => {
    dispatch({
        type: CREATE_REQUEST,
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
            type: CREATE_SUCCEED,
            payload: response.data,
        });

    } catch (error) {
        dispatch({
            type: CREATE_FAILED,
            payload: error.response
        });
    }
};

const update = (object) => async (dispatch) => {
    dispatch({
        type: UPDATE_REQUEST,
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
    getList,
    create,
    update
}