import {TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodoListAT} from './Todolist-reducer'

type ActionTasksType =
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof changeTaskTitleAC> |
    AddTodolistAT |
    RemoveTodoListAT


export const tasksReducer = (state: TasksStateType, action: ActionTasksType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const copyTasks = {...state}
            copyTasks[action.todolistId] = copyTasks[action.todolistId]
                .filter(t => t.id !== action.taskId)

            return copyTasks
        }
        case 'ADD-TASK': {
            const copyTasks = {...state}
            copyTasks[action.todolistId] = [
                {id: v1(), title: action.title, isDone: false},
                ...copyTasks[action.todolistId]]
            return copyTasks
        }
        case 'CHANGE-TASK-STATUS': {
            const copyTasks = {...state}
            copyTasks[action.todolistId] = copyTasks[action.todolistId]
                .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            return copyTasks
        }
        case 'CHANGE-TASK-TITLE': {
            const copyTasks = {...state}
            copyTasks[action.todolistId] = copyTasks[action.todolistId]
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            return copyTasks
        }
        case 'ADD-TODOLIST' : {
            const copyState = {...state}
            copyState[action.todolistId] = []
            return copyState
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        default:
            return state
    }
}
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        todolistId,
        taskId
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId,
    } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        isDone,
        todolistId,
    } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        title,
        todolistId,
    } as const
}
