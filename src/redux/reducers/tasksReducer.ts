import {v1} from "uuid";
import { todoList1, todoList2 } from "./todoListReducer";
//tasks
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = TaskType[]
export type AllTasksType = {
    [key: string]: TasksType,
}

export type TasksStateType = AllTasksType
type StateType = TasksStateType

const initialState: StateType = {
    [todoList1]: [
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "Redux", isDone: true},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "Promises", isDone: true},
        {id: v1(), title: "Thunk", isDone: true},
        {id: v1(), title: "GraphQL", isDone: true},
    ],
    [todoList2]: [
        {id: v1(), title: "Metro", isDone: false},
        {id: v1(), title: "Death Stranding", isDone: true},
    ]
}

export const tasksReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case "REMOVE-TASK":{
            const stateCopy = {...state}
            stateCopy[action.todoListID] = stateCopy[action.todoListID].filter(t=>t.id !== action.taskID)
            return stateCopy
        }
        case "CHANGE-CHECKBOX":{
            const stateCopy = {...state}
            let task = stateCopy[action.todoListID].find(t=>t.id === action.taskID)
            if(task){
                task.isDone = action.newValue
            }
            return stateCopy
        }
        default: {
            return state
        }
    }
}

type ActionsType = ReturnType<typeof removeTaskAC>
|ReturnType<typeof changeCheckBoxAC>

export const removeTaskAC = (todoListID: string, taskID: string) =>{
    return {
        type: 'REMOVE-TASK',
        todoListID,
        taskID
    } as const
}
export const changeCheckBoxAC = (todoListID: string, taskID: string, newValue: boolean) =>{
    return {
        type: 'CHANGE-CHECKBOX',
        todoListID,
        taskID,
        newValue
    } as const
}