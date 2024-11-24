import { useEffect, useState } from "react"

import store from "./store";

import * as actionTypes from './constants'

//import { increment, decrement } from "./counterReducer";
import counterSlide from "./counterSlide";

import { increment, decrement } from './counterSlide';

import { reducer } from './counterSlide'

import { getListTodoAsyncAction , addTodo, updateTodo } from './todoSlide';


import TodoList from './TodoList';

import WithLoading from '../loading/WithLoading';

import { selectIsLoading, selectListTodos } from './todoSelector';

import { connect } from 'react-redux';
import { selectCounter } from "./countSelector";


console.log('reducer from slide: ')
console.log(counterSlide.reducer)


console.log('sate from store: ')
console.log(store.getState().count)

console.log('reducer from store: ')
console.log(store.reducer)


const TodoListWithLoading = WithLoading(TodoList);

const DemoRedux = (props) => {

    //const [count, setCount] = useState(0);

    //const [count, setCount] = useState(store.getState().count);

    const [flag, setFlag] = useState(false)

    // console.log(store)
    // console.log(store.getState())

    // console.log('count received from store: ' + count)

    const increase = (e) => {
        // store.dispatch({
        //     type: actionTypes.COUNT_INCREMENT,
        //     //payload: 'hello count reducer'
        // })

        //store.dispatch(increment())

        props.increment()
    }

    const decrease = () => {
        // store.dispatch({
        //     type: actionTypes.COUNT_DECREMENT,
        //     //payload: null
        // })
        // setFlag(!flag)

        //store.dispatch(decrement())

        props.decrement()
    }
    
    // const [todos, setTodos] = useState(store.getState().todo.todos);
    // const [isLoading, setIsLoading] = useState(store.getState().todo.isLoading);

    // console.log('isLoading received: ');

    // console.log(isLoading);

    useEffect(() => {
        // store.subscribe(() => {
        //     setCount(store.getState().count)
        // })
        // console.log('component rerender & did mount...');

        //subscribeStoreToUdpateData();

        //store.dispatch(getListTodoAsyncAction());

        props.getListTodoAsyncAction();

    }, [])

    // const subscribeStoreToUdpateData = () => {
    //     store.subscribe(() => {
    //         setTodos(store.getState().todo.todos);
    //     })

    //     store.subscribe(() => {
    //         setIsLoading(store.getState().todo.isLoading);
    //     })
    // }

    //subscribeStoreToUdpateData();

    console.log('count received: ');
    console.log(props.count);

    const handleAddTodo = () => {
        props.addTodo({
            id: 4,
            name: 'PHP'}
        )
    }

    const handlePrepareTodo = () => {
        // props.prepare({
        //     id: 1,
        //     name: 'C#'
        // })

        props.updateTodo({
            id: 1,
            name: 'C#'}
        )
    }

    const getNumber = () => {
        return 10;
    }

    let ob = {
        x: getNumber
    }

    console.log('ob ject test: ')
    console.log(ob.x)

    return(
        <div>
            <p>Value from states of the store: {props.count}</p>
            <button style={{cursor: 'pointer'}} onClick={increase}>Increment</button>
            <button style={{cursor: 'pointer'}} onClick={decrease}>Decrement</button>
            <br></br>
            <br></br>
            <hr></hr>
            <button onClick={handleAddTodo}>Add Todo</button>
            <button onClick={handlePrepareTodo}>Update Todo</button>
            <TodoListWithLoading todos={props.todos} isLoading={props.isLoading}/>
        </div>
        
    )
}

const mapStateToProps = (state) => {
    return {
        todos: selectListTodos(state),
        isLoading: selectIsLoading(state),
        count: selectCounter(state)
    }
}

export default connect(mapStateToProps, ({ increment, decrement, addTodo, updateTodo, getListTodoAsyncAction }))(DemoRedux);