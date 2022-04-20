export const addTodo = (data)=>{
    return{
        type:"ADD_TODO "
    }
}

export const deleteTodo = ()=>{
    return{
        type:"DELETE_TODO "
    }
}

export const removeTodo = ()=>{
    return{
        type:"REMOVE_TODO "
    }
}