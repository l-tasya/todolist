import {RequestStatusType} from "../features/Application/app-reducer";


export type ITodoList = {
    id: string
    addedDate: string
    order: number
    title: string

}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type ITask = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type ITodoListDomain = ITodoList & {
    filter: FilterType
    entityStatus: RequestStatusType
}
export type FilterType = "All" | "Completed" | "Active"
export type FieldErrorType = { field: string; error: string }


export enum ResultCodes {
    Success = 0,
    Error = 1,
    Captcha = 10,
}