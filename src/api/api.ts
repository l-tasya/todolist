import axios, {AxiosResponse} from "axios";
import {ITask, ITodoList} from "../common/types/types";


const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "9aecfb73-6cd3-4101-8b06-9748a118440e"
    },
}
export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

export const todoListsAPI = {
    getTodoLists: () => {
        return instance.get<ITodoList[]>("todo-lists");
    },
    createTodoList: (title: string) => {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: ITodoList }>>>("todo-lists", {title: title});
    },
    deleteTodoList: (todoListID: string) => {
        return instance.delete<ResponseType>(`todo-list/${todoListID}`);
    },
    updateTodoList: (todoListID: string, title: string) => {
        return instance
            .put<ResponseType>(
                `todo-lists/${todoListID}`,
                {title: title}
            );
    },
    getTasks: (todoListID: string) => {
        return instance.get<GetTasksResponseType>(`todo-lists/${todoListID}/tasks`);
    },
    createTask: (todoListID: string, title: string) => {
        return instance.post<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${todoListID}/tasks`, {title: title})
    },
    deleteTask: (todoListID: string, taskID: string) => {
        return instance.delete<ResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`)
    },
    updateTask: (todoListID: string, taskID: string, title: string) => {
        return instance.put<ResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`, {title: title})
    }
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
    fieldsErrors: string[]
}
type GetTasksResponseType = {
    items: ITask[]
    totalCount: number
    error: string
}