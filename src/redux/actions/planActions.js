import axios from "axios";
const token = localStorage.getItem('token');

export const GET_REQUEST = 'PLAN_GET_REQUEST'
export const GET_SUCCEED = 'PLAN_GET_SUCCEED'
export const GET_FAILED = 'PLAN_GET_FAILED'
export const GET_LIST_REQUEST = 'PLAN_GET_LIST_REQUEST'
export const GET_LIST_SUCCEED = 'PLAN_GET_LIST_SUCCEED'
export const GET_LIST_FAILED = 'PLAN_GET_LIST_FAILED'
export const UPDATE_REQUEST = 'PLAN_UPDATE_REQUEST'
export const UPDATE_SUCCEED = 'PLAN_UPDATE_SUCCEED'
export const UPDATE_FAILED = 'PLAN_UPDATE_FAILED'
export const DELETE_REQUEST = 'PLAN_UPDATE_REQUEST'
export const DELETE_SUCCEED = 'PLAN_UPDATE_SUCCEED'
export const DELETE_FAILED = 'PLAN_UPDATE_FAILED'
export const CREATE_REQUEST = 'PLAN_UPDATE_REQUEST'
export const CREATE_SUCCEED = 'PLAN_CREATE_SUCCEED'
export const CREATE_FAILED = 'PLAN_CREATE_FAILED'

const apiRoute = "https://localhost:7031/api/Programme"

const get = (id) => async (dispatch) => {
    dispatch({
        type: GET_REQUEST,
    });

    try {
        const response = await axios({
            url: apiRoute + '/' + id,
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

const getList = (query,pageIndex,pageSize) => async (dispatch) => {
    dispatch({
        type: GET_LIST_REQUEST,
    });

    let url = apiRoute

    try {
        const filteredQuery = query && Object.fromEntries(
          Object.entries(query).filter(([_, v]) => v !== null)
        );
        
        const params = new URLSearchParams(filteredQuery);
        url += '?' + params.toString();

        const response = await axios.get(url, {
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
            url: apiRoute,
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

const update = (id,object) => async (dispatch) => {
    dispatch({
        type: UPDATE_REQUEST,
    });

    console.log(object);

    try {
        const response = await axios({
            url: apiRoute + '/' + id,
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
            url: apiRoute + '/' + id,
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
            payload: error.response,
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