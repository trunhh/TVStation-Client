import axios from "axios";


export const GET_LIST_REQUEST = 'TODO_GET_LIST_REQUEST'
export const GET_LIST_SUCCEED = 'TODO_GET_LIST_SUCCEED'
export const GET_LIST_FAILED = 'TODO_GET_LIST_FAILED'

const token = localStorage.getItem('token');

const getList = () => async (dispatch) => {
    dispatch({
        type: GET_LIST_REQUEST,
    });

    try {
        const response = await axios.get("/ToDo", {
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

export default {
    getList
}