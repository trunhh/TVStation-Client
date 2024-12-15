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

const getList = (route,query,pageIndex,pageSize) => async (dispatch) => {
    dispatch({
        type: planConstant.GET_LIST_REQUEST,
    });

    try {

        const filteredQuery = Object.fromEntries(
            Object.entries({
                ...query,
                startDate: query.startDate
                    ? new Date(query.startDate).toISOString()
                    : null,
                endDate: query.endDate
                    ? new Date(query.endDate).toISOString()
                    : null,
                pageIndex: (pageIndex > 0) ? pageIndex : 1,
                pageSize: (pageSize > 0)? pageSize : 10
            }).filter(([_, value]) => value !== null) // Remove entries with null values
        );
        
        const params = new URLSearchParams(filteredQuery);
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