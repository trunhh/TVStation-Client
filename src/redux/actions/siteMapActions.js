import axios from "axios";

export const GET_REQUEST = 'SITEMAP_GET_REQUEST'
export const GET_SUCCEED = 'SITEMAP_GET_SUCCEED'
export const GET_FAILED = 'SITEMAP_GET_FAILED'
export const GET_LIST_REQUEST = 'SITEMAP_GET_LIST_REQUEST'
export const GET_LIST_SUCCEED = 'SITEMAP_GET_LIST_SUCCEED'
export const GET_LIST_FAILED = 'SITEMAP_GET_LIST_FAILED'
export const UPDATE_REQUEST = 'SITEMAP_UPDATE_REQUEST'
export const UPDATE_SUCCEED = 'SITEMAP_UPDATE_SUCCEED'
export const UPDATE_FAILED = 'SITEMAP_UPDATE_FAILED'
export const DELETE_REQUEST = 'SITEMAP_UPDATE_REQUEST'
export const DELETE_SUCCEED = 'SITEMAP_UPDATE_SUCCEED'
export const DELETE_FAILED = 'SITEMAP_UPDATE_FAILED'
export const CREATE_REQUEST = 'SITEMAP_UPDATE_REQUEST'
export const CREATE_SUCCEED = 'SITEMAP_CREATE_SUCCEED'
export const CREATE_FAILED = 'SITEMAP_CREATE_FAILED'

const token = localStorage.getItem('token');

const route = "api/SiteMap"

const get = (id) => async (dispatch) => {
    dispatch({
        type: GET_REQUEST,
    });

    try {
        const response = await axios({
            url: route + '/' + id,
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
        const response = await axios.get(route, {
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
            url: route,
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
            url: route,
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

const remove = (id) => async (dispatch) => {
    dispatch({
        type: DELETE_REQUEST,
    });

    try {
        await axios({
            url: route + '/' + id,
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });

        dispatch({
            type: DELETE_SUCCEED,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: DELETE_FAILED,
            payload: error.response
        });
    }
};


export default {
    get,
    getList,
    create,
    update,
    remove
}