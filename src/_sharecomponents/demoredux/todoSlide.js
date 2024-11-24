import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import todoApi from "./api/todoApi";

import * as actionTypes from './constants'

export const getListTodoAsyncAction = createAsyncThunk(
    actionTypes.GET_LIST_TODO,
    async () => {
        const todos = await todoApi.getAll();
        console.log('todos in function: ')
        console.log(todos);
        return todos;
    }
)

const todoSlide = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        isLoading: true
    },
    reducers: {
        addTodo: {
            reducer: (state, action) => {
                console.log('state in add todo: ')
                console.log(state.todos)
                state.todos.push(action.payload);
            },
            prepare: (todo) => {
                return {
                    payload: todo
                }
            }
        },
        updateTodo: {
            reducer: (state, action) => {
                let arrTemp = state.todos.map(item => {
                    if (item.id == action.payload.id) return action.payload
                    else return item;
                })

                state.todos = arrTemp
            },
        }
    },
    extraReducers: {
        [getListTodoAsyncAction.fulfilled]: (state, actions) => {
            state.todos = actions.payload;
            state.isLoading = false;
        },
        [getListTodoAsyncAction.pending]: (state, actions) => {
            state.isLoading = true;
        }
    }
})

export const {actions, reducer } = todoSlide;

export const { addTodo, updateTodo } = actions;

export default todoSlide;