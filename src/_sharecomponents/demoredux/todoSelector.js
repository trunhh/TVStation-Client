import { createSelector } from "@reduxjs/toolkit";

const todoSelector = (state) => state.todo;

const listTodoSelector = createSelector(
    todoSelector,
    todo => todo.todos
)

const isLoadingSelector = createSelector(
    todoSelector,
    todo => todo.isLoading
)

export const selectListTodos = (state) => {
    return listTodoSelector(state);
}

export const selectIsLoading = (state) => {
    return isLoadingSelector(state);
}