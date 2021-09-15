import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'api-key': 'f499194a-9fc7-4a05-a45f-a1732e1abd57'
    }
})
type CommonResponseType<T = {}> = {
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
    data: T
}
type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export const todolistApi = {
    getTodo() {
        return instance.get<TodoType[]>('/todo-lists', {})
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<TodoType[]>>('/todo-lists', {title},)
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}`, {title})
    }
};
type ItemsType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string
    deadline: string
    addedDate: string
}

type UpdateTasksType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
type GetTaskType = {
    items: ItemsType[]
    error: null
    totalCount: number
}
type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    fieldsErrors: string
    data: T
}
export const taskApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTaskType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ items: ItemsType[] }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`,)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<{ items: ItemsType[] }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }

}
