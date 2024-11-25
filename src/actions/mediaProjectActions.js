import axios from "axios";
import mediaProjectConstants from "../constants/mediaProjectConstant";
const token = localStorage.getItem('token');

const getMediaProject = (mediaProjectId) => async (dispatch) => {
    dispatch({
        type: mediaProjectConstants.GET_MEDIA_PROJECT_REQUEST,
    });

    try {
        const response = await axios({
            url: '/api/MediaProject/' + mediaProjectId,
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        });

        dispatch({
            type: mediaProjectConstants.GET_MEDIA_PROJECT_SUCCESS,
            payload: response.data,
        });

        // Open form
        toggleMediaProjectForm(true);
    } catch (error) {
        dispatch({
            type: mediaProjectConstants.GET_MEDIA_PROJECT_FAIL,
            payload: {
                statusCode: error.response?.status || 500,
                message: 'Failed to retrieve media project',
            },
        });
    }
};

const getListMediaProject = (mediaProjectQuery) => async (dispatch) => {
    dispatch({
        type: mediaProjectConstants.GET_LIST_MEDIA_PROJECT_REQUEST,
    });

    try {
        let url = '/api/MediaProject?';

        // Construct query parameters
        const params = new URLSearchParams({
            keyword: mediaProjectQuery.keyword || '',
            sector: mediaProjectQuery.sector || '',
            status: mediaProjectQuery.status || '',
            isPersonal: mediaProjectQuery.isPersonal,
            pageIndex: mediaProjectQuery.pageIndex || 1,
            pageSize: mediaProjectQuery.pageSize || 10,
            startDate: mediaProjectQuery.startDate
                ? new Date(mediaProjectQuery.startDate).toISOString()
                : null,
            endDate: mediaProjectQuery.endDate
                ? new Date(mediaProjectQuery.endDate).toISOString()
                : null,
            siteMapId: mediaProjectQuery.siteMapId || '',
        });

        url += params.toString();

        const response = await axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        dispatch({
            type: mediaProjectConstants.GET_LIST_MEDIA_PROJECT_SUCCESS,
            payload: {
                mediaProjects: response.data.content, // Array of media projects
                totalPages: response.data.totalPages,
            },
        });
    } catch (error) {
        dispatch({
            type: mediaProjectConstants.GET_LIST_MEDIA_PROJECT_FAIL,
            payload: {
                statusCode: error.response?.status || 500,
                message: 'Failed to retrieve media projects',
            },
        });
    }
};

const createMediaProject = (mediaProject) => async (dispatch) => {
    dispatch({
        type: mediaProjectConstants.CREATE_MEDIA_PROJECT_REQUEST,
    });

    try {
        const response = await axios({
            url: '/api/MediaProject',
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(mediaProject),
        });

        dispatch({
            type: mediaProjectConstants.CREATE_MEDIA_PROJECT_SUCCESS,
            payload: response.data,
        });

        // Close form
        toggleMediaProjectForm(false);
    } catch (error) {
        dispatch({
            type: mediaProjectConstants.CREATE_MEDIA_PROJECT_FAIL,
            payload: {
                statusCode: error.response?.status || 500,
                message: 'Failed to create media project',
            },
        });
    }
};

const updateMediaProject = (mediaProject) => async (dispatch) => {
    dispatch({
        type: mediaProjectConstants.UPDATE_MEDIA_PROJECT_REQUEST,
    });

    try {
        const response = await axios({
            url: '/api/MediaProject/' + mediaProject.id,
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(mediaProject),
        });

        dispatch({
            type: mediaProjectConstants.UPDATE_MEDIA_PROJECT_SUCCESS,
            payload: response.data,
        });

        // Close form
        toggleMediaProjectForm(false);
    } catch (error) {
        dispatch({
            type: mediaProjectConstants.UPDATE_MEDIA_PROJECT_FAIL,
            payload: {
                statusCode: error.response?.status || 500,
                message: 'Failed to update media project',
            },
        });
    }
};

const deleteMediaProject = (mediaProjectId) => async (dispatch) => {
    dispatch({
        type: mediaProjectConstants.DELETE_MEDIA_PROJECT_REQUEST,
    });

    try {
        await axios({
            url: '/api/MediaProject',
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            params: {
                id: mediaProjectId,
            },
        });

        dispatch({
            type: mediaProjectConstants.DELETE_MEDIA_PROJECT_SUCCESS,
            payload: mediaProjectId,
        });
    } catch (error) {
        dispatch({
            type: mediaProjectConstants.DELETE_MEDIA_PROJECT_FAIL,
            payload: {
                statusCode: error.response?.status || 500,
                message: 'Failed to delete media project',
            },
        });
    }
};

const toggleMediaProjectForm = (isOpen) => {
    return {
        type: mediaProjectConstants.TOGGLE_MEDIA_PROJECT_FORM,
        payload: {
            mediaProjectFormOpened: isOpen
        }
    }

}

const mediaProjectActions = {
    getMediaProject,
    getListMediaProject,
    createMediaProject,
    updateMediaProject,
    deleteMediaProject,
    toggleMediaProjectForm
};

export default mediaProjectActions;
