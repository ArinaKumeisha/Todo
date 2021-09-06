import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}
type ActionTodolistType =
    RemoveTodoListAT |
    ReturnType<typeof ChangeTodolistTitleAC> |
    ReturnType<typeof ChangeTodolistFilterAC> |
    AddTodolistAT

const initialState: TodolistType[]=[]
export const todolistReducer = (state: TodolistType[]=initialState, action: ActionTodolistType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            const stateCopy = [...state]
            return stateCopy.filter(tl => tl.id != action.todolistId)
        }
        case 'ADD-TODOLIST': {
            let newTodolist: TodolistType = {id: action.todolistId, title: action.title, filter: 'all'};
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(st => st.id === action.todolistId ?
                {...st, title: action.title} : st)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(st => st.id === action.todolistId ?
                {...st, filter: action.value} : st)
        }
        default:
            return state

    }
}
export const RemoveTodoListAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId,
    } as const
}

export const AddTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistId: v1()
    } as const
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId,
        title,
    } as const
}
export const ChangeTodolistFilterAC = (todolistId: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId,
        value,
    } as const
}

