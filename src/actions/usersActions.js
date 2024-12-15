import axios from "axios";
import usersConstants from "../constants/usersConstants";
import { USERS_API } from "../constants/apiConstants";
const token = localStorage.getItem('token');

const get = (userName) => async (dispatch) => {
    dispatch({
        type: usersConstants.GET_REQUEST,
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
            type: usersConstants.GET_SUCCEED,
            payload: response.data,
        });

    } catch (error) {
        dispatch({
            type: usersConstants.GET_FAILED,
            payload: error.response
        });
    }
};

const getList = () => async (dispatch) => {
    dispatch({
        type: usersConstants.GET_LIST_REQUEST,
    });

    try {
        const response = await axios.get(USERS_API, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        dispatch({
            type: usersConstants.GET_LIST_SUCCEED,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: usersConstants.GET_LIST_FAILED,
            payload: error.response
        });
    }
};

const create = (object) => async (dispatch) => {
    dispatch({
        type: usersConstants.CREATE_REQUEST,
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
            type: usersConstants.CREATE_SUCCEED,
            payload: response.data,
        });

    } catch (error) {
        dispatch({
            type: usersConstants.CREATE_FAILED,
            payload: error.response
        });
    }
};

const update = (object) => async (dispatch) => {
    dispatch({
        type: usersConstants.UPDATE_REQUEST,
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
            type: usersConstants.UPDATE_SUCCEED,
            payload: response.data,
        });

    } catch (error) {
        dispatch({
            type: usersConstants.UPDATE_FAILED,
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