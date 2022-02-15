import {TasksType} from '../App';
import {v1} from 'uuid';
import {AddTodoListAC, RemoveTodoListAC} from "./todolistReducer";


type ActionsType = ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof AddTaskAC>
    | ReturnType<typeof ChangeTaskCheckboxAC>
    | ReturnType<typeof ChangeTaskTitleAC>
    | ReturnType<typeof AddTodoListAC>
    | ReturnType<typeof RemoveTodoListAC>
    | ReturnType<typeof SetTasksAC>

export const tasksReducer = (state: TasksType, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':{
            const stateCopy = {...state}
            stateCopy[action.todoListID] = stateCopy[action.todoListID].filter(t=>t.id != action.taskID)
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

export let RemoveTaskAC = (taskID: string, todoListID: string) => {
    return {
        type: 'REMOVE-TASK',
        taskID,
        todoListID,
    } as const
}
export let AddTaskAC = (newTaskTitle: string, todoListID: string) => {
    return {
        type: 'ADD-TASK',
        newTaskTitle,
        todoListID,
    } as const
}
export let ChangeTaskCheckboxAC = (taskID: string, changedValue: boolean, todoListID: string) => {
    return {
        type: 'CHANGE-TASK-CHECKBOX',
        taskID,
        changedValue,
        todoListID,
    } as const
}
export let ChangeTaskTitleAC = (taskID: string, changedValue: string, todoListID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskID,
        changedValue,
        todoListID,
    } as const
}
export let SetTasksAC = (newValues: TasksType) => {
    return {
        type: 'SET-TASKS',
        newValues,
    } as const
}