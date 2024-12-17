import axios from "axios";
import todoConstants from "../constants/todoConstants";
import { SCRIPT_PROGRAM_API } from "../constants/apiConstants";
const token = localStorage.getItem('token');

const getList = () => async (dispatch) => {
    dispatch({
        type: todoConstants.GET_LIST_REQUEST,
    });

    try {
        const response = await axios.get(SCRIPT_PROGRAM_API + "/ToDo", {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        dispatch({
            type: todoConstants.GET_LIST_SUCCEED,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: todoConstants.GET_LIST_FAILED,
            payload: error.response
        });
    }
};

export default {
    getList
}