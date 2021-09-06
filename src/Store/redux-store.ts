import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./Tasks-reducer";
import {todolistReducer} from "./Todolist-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)
// @ts-ignore
window.store = store;
