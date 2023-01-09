import axios from "axios";


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '><...><'
    },
}


export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}
type TaskType = {
    id: string
    completed: boolean
    title: string
    order: number
    description: string
    status: number
    priority: number
    startDate: typeof Date
    deadline: typeof Date
    todoListID: string
    addedDate: typeof Date

}
export const todoListsAPI = {
    getTodoLists: () =>{
        return instance.get<TodoListType[]>('todo-lists');
    },
    createTodoList: (title: string) =>{
        return instance.post<ResponseType<{item: TodoListType}>>('todo-lists', {title: title});
    },
    deleteTodoList: (todoListID: string) => {
        return instance.delete<ResponseType>(`todo-list/${todoListID}`);
    },
    updateTodoList: (todoListID: string, title: string) =>{
        return instance.put<ResponseType>(`todo-lists/${todoListID}`, {title: title});
    },
    getTasks: (todoListID: string) =>{
        return instance.get<GetTasksResponseType>(`todo-lists/${todoListID}/tasks`);
    },
    createTask: (todoListID: string, title: string) =>{
        return instance.post<ResponseType>(`todo-lists/${todoListID}/tasks`, {title: title})
    },
    deleteTask: (todoListID: string, taskID: string)=>{
        return instance.delete<ResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`)
    },
    updateTask: (todoListID: string, taskID: string, title: string) =>{
        return instance.put<ResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`, {title:title})
    }
}