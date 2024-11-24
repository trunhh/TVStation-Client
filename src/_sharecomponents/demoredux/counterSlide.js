import { createSlice } from "@reduxjs/toolkit";

const counterSlide = createSlice({
    name: 'counter',

    // initialState: 0,
    // reducers: {
    //     increment: state => state + 1,
    //     decrement: state => state - 1,
    // }

    initialState: {
        value: 0
    },
    reducers: {
        increment: state => { state.value += 1 },
        decrement: state => { state.value -= 1 },
    }
})

export const { actions, reducer } = counterSlide;
export const { increment, decrement } = actions;

export default counterSlide;