import React, {useEffect, useState} from 'react'
import {taskApi, todolistApi} from "../api/todolist-api";


export default {
    title: 'API'
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>([])
    useEffect(() => {
        todolistApi.getTodo()
            .then((res) => {
                setState(res.data);

            })
    }, [])

    return <div> {JSON.stringify(state)}</div>  //преобразует в строку json
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const createTodo = () => {
        todolistApi.createTodo(title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        <div>
            {JSON.stringify(state)}
        </div>
        <input placeholder={'Enter new title'}
               value={title}
               onChange={(e) => {
                   setTitle(e.currentTarget.value)
               }}/>
        <button onClick={createTodo}>create todoList</button>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTodoList = () => {
        todolistApi.deleteTodo(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>
            {JSON.stringify(state)}
        </div>
        <input placeholder={'Enter id of todolist'}
               value={todolistId}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <button onClick={deleteTodoList}>delete todoList</button>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todolistId, setTodoListId] = useState<string>('')
    const upDateTodolistTitle = () => {
        todolistApi.updateTodoTitle(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>
            {JSON.stringify(state)}
        </div>
        <input placeholder={'title update'} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>

        <input placeholder={'Id of todoList'} value={todolistId} onChange={(e) => {
            setTodoListId(e.currentTarget.value)
        }}/>
        <button onClick={upDateTodolistTitle}>update title of todolist</button>

    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>([])
    useEffect(() => {
        const todolistId = '048be1af-ecd4-4b32-bfbe-c855c184fe36'
        taskApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data.items)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '048be1af-ecd4-4b32-bfbe-c855c184fe36'
        const title = 'CSSandHTML'
        taskApi.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodoListId] = useState<string>('')

    const deleteTask = () => {
        const todolistId = '048be1af-ecd4-4b32-bfbe-c855c184fe36'
        const taskId = "7c2a0445-1e02-4a93-b671-dab479ae6839"
        taskApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        <div> {JSON.stringify(state)}
        </div>
        <input placeholder={'task'}
               value={taskId}
               onChange={(e) => {
                   setTaskId(e.currentTarget.value)
               }}/>

        <input placeholder={'todolistId'}
               value={todolistId}
               onChange={(e) => {
                   setTodoListId(e.currentTarget.value)
               }}/>
        <button onClick={deleteTask}>DeleteTask</button>
    </div>
}

export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '048be1af-ecd4-4b32-bfbe-c855c184fe36'
        const taskId = 'd1136122-1ccb-4ba3-b89c-aec40d79fc83'
        const title = 'OOO'
        taskApi.updateTask(todolistId, taskId, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}