import * as actionTypes from './constants';

const initState = {
    value: 0
}

const countReducer = (state = initState, action) => {
    // console.log('action from UI: ')
    // console.log(action)

    switch(action.type) {
        case actionTypes.COUNT_INCREMENT:
            //console.log('123abc');
            return {
                ...state,
                value: state.value + 1
            }
        case actionTypes.COUNT_DECREMENT:
            return {
                ...state,
                value: state.value - 1
            } 
        default: 
            return state
    }
}

export default countReducer;