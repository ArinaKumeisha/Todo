import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionTodolistType =
    ReturnType<typeof RemoveTodoListAC> |
    ReturnType<typeof AddTodolistAC> |
    ReturnType<typeof ChangeTodolistTitleAC> |
    ReturnType<typeof ChangeTodolistFilterAC>


export const todolistReducer = (state: Array<TodolistType>, action: ActionTodolistType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            const stateCopy = [...state]
            return stateCopy.filter(tl => tl.id != action.todolistId)
        }
        case 'ADD-TODOLIST': {
            let newTodolistId = v1()
            let newTodolist: TodolistType = {id: newTodolistId, title: action.title, filter: 'all'};
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