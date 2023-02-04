import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "./todoListReducer";
import {ITask, TasksReducerType} from "../../common/types/types";


type StateType = TasksReducerType
const initialState: StateType = {}

export const tasksReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todoListID] = stateCopy[action.todoListID].filter(t => t.id !== action.taskID)
            return stateCopy
        }
        case "CHANGE-CHECKBOX": {
            const stateCopy = {...state}
            let task = stateCopy[action.todoListID].find(t => t.id === action.taskID)
            if (task) {
                task.completed = action.newValue
            }
            stateCopy[action.todoListID] = [...stateCopy[action.todoListID]]
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const newItem: ITask = {
                id: v1(),
                title: action.newValue,
                completed: false,
                addedDate: Date,
                deadline: Date,
                description: "",
                order: 0,
                priority: 0,
                startDate: Date,
                status: 0,
                todoListId: action.todoListID
            }
            stateCopy[action.todoListID] = [newItem, ...stateCopy[action.todoListID]]
            return stateCopy
        }
        case "ADD-TODO-LIST": {
            const stateCopy = {...state}
            stateCopy[action.id] = []
            return stateCopy
        }
        case "REMOVE-TODO-LIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todoListID]
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const task = stateCopy[action.todoListID].find(t => t.id === action.taskID)
            if (task) {
                task.title = action.newValue
            }
            stateCopy[action.todoListID] = [...stateCopy[action.todoListID]]
            return stateCopy
        }
        case "SET-TODO-LISTS":{
            const stateCopy = {...state}

            action.items.forEach((t)=>{
               stateCopy[t.id] = []
            })
            return stateCopy
        }
        default: {
            return state
        }
    }
}

type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeCheckBoxAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTodoListsAC>

export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: "REMOVE-TASK",
        todoListID,
        taskID
    } as const
}
export const changeCheckBoxAC = (todoListID: string, taskID: string, newValue: boolean) => {
    return {
        type: "CHANGE-CHECKBOX",
        todoListID,
        taskID,
        newValue
    } as const
}
export const addTaskAC = (todoListID: string, newValue: string) => {
    return {
        type: "ADD-TASK",
        todoListID,
        newValue
    } as const
}
export const changeTaskTitleAC = (todoListID: string, taskID: string, newValue: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        todoListID,
        taskID,
        newValue
    } as const
}