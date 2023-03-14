import axios, {AxiosResponse} from 'axios';
import {ITask, ITodoList, ResultCodes, TaskPriorities, TaskStatuses} from "./types";


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '9aecfb73-6cd3-4101-8b06-9748a118440e'
    },
}
export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type LoginPayload = {
    email: string
    password: string
    rememberMe: boolean
}
export const authAPI = {
    me: async() => {
        return await instance.get<ResponseType<{ userId: number }>>('auth/me')
    },
    logIn: async (data: LoginPayload) => {
        return  await instance.post('auth/login', data)
    },
    logOut: async() => {
let response = await instance.delete<ResponseType>('auth/login')
        return response.data
    }

}
export const todoListsAPI = {
    getTodoLists: async () => {
        return await instance.get<ITodoList[]>('todo-lists');
    },
    createTodoList: async (title: string) => {
        return await instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: ITodoList }>>>('todo-lists', {title: title});
    },
    deleteTodoList: async (todoListID: string) => {
        return await instance.delete<ResponseType>(`todo-lists/${todoListID}`);
    },
    updateTodoList: async (todoListID: string, title: string) => {
        return await instance.put<ResponseType>(`todo-lists/${todoListID}`, {title: title});
    },
    getTasks:  async (todoListID: string) => {
        let response =  await instance.get<GetTasksResponseType>(`todo-lists/${todoListID}/tasks`);
        return response.data
    },
    createTask: async (todoListID: string, title: string) => {
        return await instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: ITask }>>>(`todo-lists/${todoListID}/tasks`, {title: title})
    },
    deleteTask: async (todoListID: string, taskID: string) => {
        return await instance.delete<ResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`)
    },
    updateTask: async (todoListID: string, taskID: string, model: UpdateTaskModelType) => {
        return await instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: ITask }>>>(`todo-lists/${todoListID}/tasks/${taskID}`, model)
    }
}
export type ResponseType<D = {}> = {
    resultCode: ResultCodes
    messages: Array<string>
    data: D
    fieldsErrors: string[]
}
type GetTasksResponseType = {
    items: ITask[]
    totalCount: number
    error: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}