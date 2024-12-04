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
            payload: error.response
        });
    }
};

const getList = (route,query) => async (dispatch) => {
    dispatch({
        type: planConstant.GET_LIST_REQUEST,
    });

    try {

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

        let url = route + '?' + params.toString();

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
            payload: error.response
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
            payload: error.response
        });
    }
};

const update = (route,id,object) => async (dispatch) => {
    dispatch({
        type: planConstant.UPDATE_REQUEST,
    });

    try {
        const response = await axios({
            url: route + '/' + id,
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
            payload: error.response
        });
    }
};

const remove = (route,id) => async (dispatch) => {
    dispatch({
        type: planConstant.DELETE_REQUEST,
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

const clearSelected = () => (dispatch) => {
    dispatch({
        type: planConstant.CLEAR_SELECTED,
    });
};

export default {
    get,
    getList,
    create,
    update,
    remove,
    clearSelected
}