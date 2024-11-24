// import { createStore } from "redux";
// import rootReducer from "./rootReducer";

// const store = createStore(rootReducer);

// export default store;

//Redux-toolkit
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterReducer";

import counterSlide from "./counterSlide";
import todoSlide from "./todoSlide";

// const store = configureStore({
//     reducer: {
//         count: counterReducer,
//     }
// })

const store = configureStore({
    reducer: {
        count: counterSlide.reducer,
        todo: todoSlide.reducer
    }
})

export default store;
