import axios from "axios";

import groupConstants from "../constants/groupConstants"
import viewActions from "./viewActions";

const token = localStorage.getItem('token')

const getListGroups = (groupFilterForm) => async(dispath) => {
    dispath({
        type: groupConstants.GET_LIST_GROUP_REQUEST
    })

    try {
        if (groupFilterForm) {
            let startDateConvert = null
            if (groupFilterForm.startDate != null) {
                startDateConvert =  groupFilterForm.startDate.getDate() + '/' + (groupFilterForm.startDate.getMonth() + 1) + '/' + groupFilterForm.startDate.getFullYear()
            }
            let endDateConvert = null
            if (groupFilterForm.endDate != null) {
                endDateConvert =  groupFilterForm.endDate.getDate() + '/' + (groupFilterForm.endDate.getMonth() + 1) + '/' + groupFilterForm.endDate.getFullYear()
            }

            /* Format input date to filter by DateTime example */
            // startDateConvert = '2022-05-15 09:12:03'
            // endDateConvert = '2022-05-20 09:27:15'

            let url = 'https://localhost:7031/api/groups/paging?' + 
            'pageNumber=' + groupFilterForm.pageNumber + '&size=' + groupFilterForm.pageSize + '&sort=' + groupFilterForm.sort + '&type=' +
            groupFilterForm.type + '&startDate=' + startDateConvert + '&endDate=' + endDateConvert

            const response = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            })

            dispath({
                type: groupConstants.GET_LIST_GROUP_SUCCESS,
                payload: {
                    listGroups: response.data.content,// Array group
                    totalPagesListGroups: response.data.totalPages 
                }
            })
        }else {
            let url = 'https://localhost:7031/api/groups'

            const response = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            dispath({
                type: groupConstants.GET_LIST_GROUP_SUCCESS,
                payload: {
                    listGroups: response.data,
                    totalPagesListGroups: response.data.length // Array group
                }
            })
        }
    }catch (error) {
        dispath({
            type: groupConstants.GET_LIST_GROUP_FAIL,
            payload: {
                statusCode: error.response.status,
                message: "Get list groups fail"
            }
        })
    }
}

const updateGroup = (groupItem) => async(dispath) => {
    console.log(groupItem)
    dispath({
        type: groupConstants.UPDATE_GROUP_REQUEST
    })

    try {
        const response = await axios({
            url: '/api/groups?id=' + groupItem.id,
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                name: groupItem.name,
                type: groupItem.type,
                createdAt: groupItem.createdAt,
                totalMember: groupItem.totalMember    
            })
        })

        console.log(response.data)

        dispath({
            type: groupConstants.UPDATE_GROUP_SUCCESS,
            payload: response.data
        })

        //close form
        dispath(viewActions.toggleFormGroup(false))
    }catch (error) {
        dispath({
            type: groupConstants.UPDATE_GROUP_FAIL,
            payload: {
                statusCode: error.response.status,
                message: "Update group fail!"
            }
        })
    }
}

const creatingGroup = (groupItem) => async(dispath) => {
    console.log('create group: ')
    console.log(groupItem)
    dispath({
        type: groupConstants.CREATE_GROUP_REQUEST
    })

    try {
        const response = await axios({
            url: '/api/groups',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                name: groupItem.name,
                type: groupItem.type,
                createdAt: groupItem.createdAt,
                totalMember: groupItem.totalMember
            })
        })

        console.log(response.data)

        dispath({
            type: groupConstants.CREATE_GROUP_SUCCESS,
            payload: response.data
        })

        //close form
        dispath(viewActions.toggleFormGroup(false))
    }catch (error) {
        dispath({
            type: groupConstants.CREATE_GROUP_FAIL,
            payload: {
                statusCode: error.response.status,
                message: "Create group fail!"
            }
        })
    }
}

const deleteGroup = groupId => async(dispath) => {
    dispath({
        type: groupConstants.DELETE_GROUP_REQUEST
    })

    try {
        const response = await axios({
            url: '/api/groups',
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            params: {
                id: groupId
            }
        })

        console.log(response.data)

        dispath({
            type: groupConstants.DELETE_GROUP_SUCCESS,
            payload: response.data
        })

    }catch (error) {
        dispath({
            type: groupConstants.DELETE_GROUP_FAIL,
            payload: {
                statusCode: error.response.status,
                message: "Create group fail!"
            }
        })
    }
}


const groupActions = {
    getListGroups,
    creatingGroup,
    updateGroup,
    deleteGroup
}

export default groupActions