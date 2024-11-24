import { useEffect } from "react";

const TodoList = (props) => {
    console.log('is loading todolist: ')
    console.log(props.isLoading);

    useEffect(() => {
        console.log('123abc')
        props.showLoading(props.isLoading)
    }, [props.isLoading])

    console.log('component TodoList rendered...')
    return (
        <ul>
            {
                props.todos.map((item, idex) => {
                    return (
                        <li key={item.id}>{item.name}</li>
                    )
                })
            }
        </ul>
    )
}

export default TodoList;