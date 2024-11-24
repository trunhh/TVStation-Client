import { createSelector } from "@reduxjs/toolkit";

const selectCount = (state) => state.count;

const countSelector = createSelector(
    selectCount,
    //count => count

    count => count.value
)


export const selectCounter = (state) => {
    return countSelector(state);
}
