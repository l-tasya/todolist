import {v1} from 'uuid';
import { TasksType } from '../AppWithRedux';
import {addTodoListAC, removeTodoListAC, todoListID1, todoListID2} from "./todolistReducer";


type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskCheckboxAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTasksAC>

const initialState: TasksType = {
    [todoListID1]: [
        {id: v1(), taskTitle: 'reactSN', isDone: true},
        {id: v1(), taskTitle: 'Kabzda', isDone: false},
        {id: v1(), taskTitle: 'Code Wars', isDone: true},
        {id: v1(), taskTitle: 'Todo List', isDone: true},
        {id: v1(), taskTitle: 'Home Work', isDone: false},
        {id: v1(), taskTitle: 'Counter', isDone: false},
        {id: v1(), taskTitle: 'Local Storage', isDone: false},
    ],
    [todoListID2]: [
        {id: v1(), taskTitle: 'Iron a Shirt', isDone: false},
        {id: v1(), taskTitle: 'Collect the bag', isDone: false},
        {id: v1(), taskTitle: 'Prepare clothes for next day', isDone: false},
        {id: v1(), taskTitle: 'Contain dinner for the next day', isDone: false},
        {id: v1(), taskTitle: 'do homework', isDone: false},
        {id: v1(), taskTitle: 'set alarm', isDone: false},
    ]
}
export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':{
            const stateCopy = {...state}
            stateCopy[action.todoListID] = stateCopy[action.todoListID].filter(t=>t.id !== action.taskID)
            return stateCopy
        }
        case 'ADD-TASK':{
            const stateCopy = {...state}
            const tasksCopy = stateCopy[action.todoListID]
            let newTask = {id: v1(), taskTitle: action.newTaskTitle, isDone: false}
            stateCopy[action.todoListID] = [newTask, ...tasksCopy]
            return stateCopy
        }
        case 'CHANGE-TASK-CHECKBOX': {
            //create state copy
            const stateCopy = {...state};
            //find task
            let task = stateCopy[action.todoListID].find(t => t.id === action.taskID)
            if (task) {
                task.isDone = action.changedValue
            }
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.id] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.removeId]
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}

            const tasks = stateCopy[action.todoListID]
            let task = tasks.find(t=>t.id === action.taskID)
            if(task){
                task.taskTitle = `${action.changedValue}`
                task.isDone = false
            }
            return stateCopy
        }
        case "SET-TASKS":{
            return {
                ...action.newValues
            }
        }
        default:
            return {...state}
    }
}

export let removeTaskAC = (taskID: string, todoListID: string) => {
    return {
        type: 'REMOVE-TASK',
        taskID,
        todoListID,
    } as const
}
export let addTaskAC = (newTaskTitle: string, todoListID: string) => {
    return {
        type: 'ADD-TASK',
        newTaskTitle,
        todoListID,
    } as const
}
export let changeTaskCheckboxAC = (taskID: string, changedValue: boolean, todoListID: string) => {
    return {
        type: 'CHANGE-TASK-CHECKBOX',
        taskID,
        changedValue,
        todoListID,
    } as const
}
export let changeTaskTitleAC = (taskID: string, changedValue: string, todoListID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskID,
        changedValue,
        todoListID,
    } as const
}
export let setTasksAC = (newValues: TasksType) => {
    return {
        type: 'SET-TASKS',
        newValues,
    } as const
}