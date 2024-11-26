import axios from "axios";
import planConstant from "../constants/planConstant";
const token = localStorage.getItem('token');

const get = (route,id) => async (dispatch) => {
    dispatch({
        type: planConstant.GET_REQUEST,
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
            type: planConstant.GET_SUCCEED,
            payload: response.data,
        });

    } catch (error) {
        dispatch({
            type: planConstant.GET_FAILED,
            payload: {
                statusCode: error.response?.status || 500,
                message: 'Failed to retrieve object',
            },
        });
    }
};

const getList = (route,query) => async (dispatch) => {
    dispatch({
        type: planConstant.GET_LIST_REQUEST,
    });

    try {
        let url = route + '?';

        // Construct query parameters
        const params = new URLSearchParams({
            ...query,
            startDate: query.startDate
                ? new Date(query.startDate).toISOString()
                : null,
            endDate: query.endDate
                ? new Date(query.endDate).toISOString()
                : null
        });

        url += params.toString();

        const response = await axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        dispatch({
            type: planConstant.GET_LIST_SUCCEED,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: planConstant.GET_LIST_FAILED,
            payload: {
                statusCode: error.response?.status || 500,
                message: 'Failed to retrieve data',
            },
        });
    }
};

const getListInit = (route) => async (dispatch) => {
    dispatch({
        type: planConstant.GET_LIST_INIT_REQUEST,
    });

    try {
        const response = await axios.get(route +' ?pageIndex=1', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        dispatch({
            type: planConstant.GET_LIST_INIT_SUCCEED,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: planConstant.GET_LIST_INIT_FAILED,
            payload: {
                statusCode: error.response?.status || 500,
                message: 'Failed to retrieve data',
            },
        });
    }
};

const create = (route,object) => async (dispatch) => {
    dispatch({
        type: planConstant.CREATE_REQUEST,
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
            type: planConstant.CREATE_SUCCEED,
            payload: response.data,
        });

    } catch (error) {
        dispatch({
            type: planConstant.CREATE_FAILED,
            payload: {
                statusCode: error.response?.status || 500,
                message: 'Failed to create object',
            },
        });
    }
};

const update = (route,object) => async (dispatch) => {
    dispatch({
        type: planConstant.UPDATE_REQUEST,
    });

    try {
        const response = await axios({
            url: route + '/' + object.id,
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(object),
        });

        dispatch({
            type: planConstant.UPDATE_SUCCEED,
            payload: response.data,
        });

    } catch (error) {
        dispatch({
            type: planConstant.UPDATE_FAILED,
            payload: {
                statusCode: error.response?.status || 500,
                message: 'Failed to update object',
            },
        });
    }
};

const remove = (route,id) => async (dispatch) => {
    dispatch({
        type: planConstant.DELETE_REQUEST,
    });

    try {
        await axios({
            url: route,
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            params: {
                id: id,
            },
        });

        dispatch({
            type: planConstant.DELETE_SUCCEED,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: planConstant.DELETE_FAILED,
            payload: {
                statusCode: error.response?.status || 500,
                message: 'Failed to delete object',
            },
        });
    }
};


export default {
    get,
    getList,
    getListInit,
    create,
    update,
    remove
}