import {TasksType} from '../App';
import {v1} from 'uuid';


type ActionsType = ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof AddTaskAC>
    | ReturnType<typeof ChangeTaskCheckboxAC>
    | ReturnType<typeof ChangeTaskTitleAC>

export const tasksReducer = (state: TasksType, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            state[action.todoListID] = state[action.todoListID].filter(t => t.id !== action.taskID)
            return {...state}
        case 'ADD-TASK':
            let newTask = {id: v1(), taskTitle: action.newTaskTitle, isDone: false}
            state[action.todoListID] = [newTask, ...state[action.todoListID]]
            return {...state}
        case 'CHANGE-TASK-CHECKBOX':
            let task = state[action.todoListID].find(t => t.id === action.taskID);
            if (task) {
                task.isDone = action.changedValue
            }
            return {...state}
        case 'CHANGE-TASK-TITLE':
            let curr = state[action.todoListID].find(t => t.id === action.taskID)
            if (curr) {
                curr.taskTitle = `${action.changedValue}`
                curr.isDone = false
            }
            return {...state}
        default:
            throw new Error('I don\'t understand this action type')
    }
}

export let RemoveTaskAC = (taskID: string, todoListID: string) => {
    return {
        type: 'REMOVE-TASK',
        taskID: taskID,
        todoListID: todoListID,
    } as const
}
export let AddTaskAC = (newTaskTitle: string, todoListID: string) => {
    return {
        type: 'ADD-TASK',
        newTaskTitle: newTaskTitle,
        todoListID: todoListID,
    } as const
}
export let ChangeTaskCheckboxAC = (taskID: string, changedValue: boolean, todoListID: string) => {
    return {
        type: 'CHANGE-TASK-CHECKBOX',
        taskID: taskID,
        changedValue: changedValue,
        todoListID: todoListID,
    } as const
}
export let ChangeTaskTitleAC = (taskID: string, changedValue: string, todoListID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskID: taskID,
        changedValue: changedValue,
        todoListID: todoListID,
    } as const
}