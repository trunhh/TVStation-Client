import axios from "axios";

import userConstants from "../constants/userConstants";

const token = localStorage.getItem('token')

const getUserInfo = (username) => async(dispath) => {
    dispath({
        type: userConstants.GET_USER_INFO_REQUEST
    })

    try {
        const response = await axios.get('/api/User/' + username, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        dispath({
            type: userConstants.GET_USER_INFO_SUCCESS,
            payload: response.data
        })
    }catch (error) {
        console.log(error.response)
        let messageError = ''
        if (error.response.status == 401) {
            messageError = 'Unauthorized! Please login first to receive tokens'
        }else if (error.response.status == 500) {
            messageError = `Get user's info fail. Internal server error!`
        }else if (error.response.status == 403) {
            messageError = `You don not have permission to access / on the server. Forbidden!`
        }
        dispath({
            type: userConstants.GET_USER_INFO_FAIL,
            payload: {
                statusCode: error.response.status,
                message: messageError
            }
        })
    }
}
const updateUserInfo = (user, avatarUploadFile) => async(dispatch) => {
    dispatch({
        type: userConstants.UPDATE_USER_INFO_REQUEST
    })

    try {
        if (avatarUploadFile) {
            var formData = new FormData();
            formData.append("image", avatarUploadFile, avatarUploadFile.name);
            let responseUpload = await axios({
                method: 'POST',
                url: 'http:///api/files/image',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data : formData
            })
            const response = await axios({
                method: 'PUT',
                url: '/api/User/' + user.id,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    role: localStorage.getItem('role').replace('[', '').replace(']', ''),
                    status: 'ACTIVE',
                    avatarUrl: responseUpload ? responseUpload.data : ''
                }
            })

            localStorage.setItem('avatarUrl', responseUpload.data )

            dispatch({
                type: userConstants.UPDATE_USER_INFO_SUCCESS,
                payload: responseUpload.data 
            })
        }else {
            const response = await axios({
                method: 'PUT',
                url: '/api/User/' + user.id,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    role: localStorage.getItem('role').replace('[', '').replace(']', ''),
                    status: 'ACTIVE',
                    avatarUrl: localStorage.getItem('avatarUrl') ? localStorage.getItem('avatarUrl') : ''
                }
            })
            dispatch({
                type: userConstants.UPDATE_USER_INFO_SUCCESS,
                payload: response.data 
            })
        }
    }catch (error) {
        dispatch({
            type: userConstants.UPDATE_USER_INFO_FAIL,
            payload: 'Update user info fail'
        })
        if (error.response) {
            //Request made and server responsed
            console.log(error.response.data)
            console.log(error.response.status)
        }else if (error.request) {
            //The request was made but no response was received
            console.log(error.request)
        }else {
            console.log('Error', error.message)
        }
    }
}


const changePassword = (username, newPassword) => async(dispath) => {
    dispath({
        type: userConstants.CHANGE_PASSWORD_REQUEST
    })

    try {
        const response = await axios({
            url: '/api/Users/password-changing',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            params: {
                username: username,
                newPassword: newPassword
            }
        })

        console.log(response.data)

        dispath({
            type: userConstants.CHANGE_PASSWORD_SUCCESS,
            payload: response.data
        })

    }catch (error) {
        dispath({
            type: userConstants.CHANGE_PASSWORD_FAIL,
            payload: {
                statusCode: error.response.status,
                message: error.response.data
            }
        })
    }
}

const userActions = {
    getUserInfo,
    updateUserInfo,
    changePassword
}

export default userActions