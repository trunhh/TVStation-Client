const todoList = [
    {
        id: 1,
        name: 'Lap trinh Nodejs'
    },
    {
        id: 2,
        name: 'Lap trinh Reactjs'
    },
    {
        id: 3,
        name: 'Lap trinh Python'
    }
]

const getAll = () => {
    return new Promise((resolve, reject) => {
        console.log('async action: ')
        setTimeout(() => {

            console.log(todoList);

            resolve(todoList);
            
        }, 4000)
    })
}

const todoApi = {
    getAll
}

export default todoApi;