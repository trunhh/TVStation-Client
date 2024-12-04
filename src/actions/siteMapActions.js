import axios from "axios";
import siteMapConstant from "../constants/siteMapConstant";
const token = localStorage.getItem('token');

const route = "api/SiteMap"

const get = (id) => async (dispatch) => {
    dispatch({
        type: siteMapConstant.GET_REQUEST,
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
            type: siteMapConstant.GET_SUCCEED,
            payload: response.data,
        });

    } catch (error) {
        dispatch({
            type: siteMapConstant.GET_FAILED,
            payload: error.response
        });
    }
};

const getList = () => async (dispatch) => {
    dispatch({
        type: siteMapConstant.GET_LIST_REQUEST,
    });

    try {
        const response = await axios.get(route, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        dispatch({
            type: siteMapConstant.GET_LIST_SUCCEED,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: siteMapConstant.GET_LIST_FAILED,
            payload: error.response
        });
    }
};

const create = (object) => async (dispatch) => {
    dispatch({
        type: siteMapConstant.CREATE_REQUEST,
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
            type: siteMapConstant.CREATE_SUCCEED,
            payload: response.data,
        });

    } catch (error) {
        dispatch({
            type: siteMapConstant.CREATE_FAILED,
            payload: error.response
        });
    }
};

const update = (object) => async (dispatch) => {
    dispatch({
        type: siteMapConstant.UPDATE_REQUEST,
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
            type: siteMapConstant.UPDATE_SUCCEED,
            payload: response.data,
        });

    } catch (error) {
        dispatch({
            type: siteMapConstant.UPDATE_FAILED,
            payload: error.response
        });
    }
};

const remove = (id) => async (dispatch) => {
    dispatch({
        type: siteMapConstant.DELETE_REQUEST,
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
            type: siteMapConstant.DELETE_SUCCEED,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: siteMapConstant.DELETE_FAILED,
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