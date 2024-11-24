import { createAction, createReducer } from "@reduxjs/toolkit";

export const increment = createAction('INCREMENT');
export const decrement = createAction('DECREMENT');
const initialState = 0;

const counterReducer = createReducer(initialState, {
    [increment.type]: value => value + 1,
    [decrement.type]: value => value - 1
})

export default counterReducer;

