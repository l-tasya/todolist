import { ITask, ITodoListDomain } from "../../api/types"
import { RequestStatusType } from "../../features/Application/app-reducer"


export type TasksReducerType = {
    [key: string]: ITaskDomain[]
}
export type ITaskDomain = ITask &{
    entityStatus: RequestStatusType
}
export type TodoListReducerType = ITodoListDomain[]



export type ErrorCustomType = {
    messages: string[]
    fieldError: string
}