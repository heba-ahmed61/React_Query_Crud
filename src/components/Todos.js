import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addTodo, deleteTodo, editTodo, getTodos } from "../api/todosApi";
const TodosList = () => {
    const queryClient = useQueryClient()
    // getTodos
    const {data:todos, isLoading , isError ,error} = useQuery('todos',getTodos)
    // addTodo
    const [todoTitle,setTodoTitle] = useState('')
    const addTodoMutation = useMutation(addTodo,{
        // onSuccess:(addedItem)=>{
        //       queryClient.invalidateQueries('todos') 
           
        // }
        // anothor way
        onSuccess: (addedItem) => {
            const previousData = queryClient.getQueryData('todos');
            const updatedData = [addedItem,...previousData ];
            queryClient.setQueryData('todos', updatedData);
          }
    })
    //editTodo
    const [edit, setEdit] = useState(false)
    const [editItem,setEditItem] = useState(null)
    const editTodoMutation = useMutation(editTodo,{
    //     onSuccess:(response)=>{
    //          queryClient.invalidateQueries('todos') 
    //    }  
    // anthor way
    onSuccess:(editedItem)=>{
        const updatedData = queryClient.getQueryData('todos');
        if (updatedData){
        const filteredData = updatedData.map(todo => todo.id == editedItem?.id ? editedItem : todo );
         queryClient.setQueryData('todos', filteredData);
        console.log(filteredData)
        }
  } 
    })
    // deleteTodo
    const deleteTodoMutaion = useMutation(deleteTodo,{
        // onSuccess : () => {
        //     queryClient.invalidateQueries('todos')
        // }
        // anothor way
        onSuccess : (deletedTodo) => {
            const updatedData = queryClient.getQueryData('todos');
            if (updatedData){
            const filteredData = updatedData.filter(todo => todo.id !== deletedTodo?.id);
            queryClient.setQueryData('todos', filteredData);
            }
        }
    })
    // handle add submit
    const handleSubmit = (e) => {
       e.preventDefault()
       if (edit == false){
        addTodoMutation.mutate({
            userId:1,
            title:todoTitle,
            completed:true
           })
           setTodoTitle('')
       }else{
        editTodoMutation.mutate({
            id:editItem,
            title:todoTitle
        })
        setTodoTitle('')
       }
     
       
    }
    if (isLoading) {
        return <p>loading</p>
    }
    if (isError){
        return <p>{error.message}</p>
    }
    return(
        <div>
            <h1>Todos Crud Opertaions</h1>
            <div className="todo_form">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" onChange={(e) => setTodoTitle(e.target.value)} value={todoTitle}/>
                    <button disabled={todoTitle == '' && true}>{edit ? 'edit todo' : 'add todo'}</button>
                </form>
            </div>
            <div className="todos-list">
                {todos?.reverse()?.map(item => (
                    <div className="todo_item" key={item?.id}>
                        <h2>
                            {item?.id}-{item?.title}
                        </h2>
                        <div>
                            <button onClick={(e)=> deleteTodoMutaion.mutate(item?.id)}>delete</button>
                            <button onClick={(e) => {
                                setTodoTitle(item?.title)
                                setEdit(true)
                                setEditItem(item?.id)
                            }}>edit</button>
                            </div>
                    </div>
                ) )}
            </div>
        </div>
    )
}
export default TodosList