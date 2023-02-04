export type ITodoList = {
    id: string
    addedDate?: typeof Date
    order: number
    title: string

}
export type ITask = {
    completed: boolean
    title: string
    description: string
    status: number
    priority: number
    startDate: typeof Date
    deadline: typeof Date
    todoListId: string
    id: string
    order: number
    addedDate: typeof Date
}
export type ITodoListDomain = ITodoList & {
    filter: FilterType
}
export type FilterType = "All" | "Completed" | "Active"





export type TasksReducerType = {
    [key: string]: ITask[]
}
export type TodoListReducerType = ITodoListDomain[]