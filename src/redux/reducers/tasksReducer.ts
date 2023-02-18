import {addTodoListAC, removeTodoListAC, setTodoListsAC} from './todoListReducer';
import {ITask, ITaskDomain, ResultCodes, TasksReducerType, TaskStatuses} from '../../common/types/types';
import {Dispatch} from 'redux';
import {todoListsAPI} from '../../api/todolists-api';
import {AppStateType} from '../store/store';
import {RequestStatusType, setErrorAC, setLoadingStatusAC} from './app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../common/utils/error-utils';


type StateType = TasksReducerType
const initialState: StateType = {}

export const tasksReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            stateCopy[action.todoListID] = stateCopy[action.todoListID].filter(t => t.id !== action.taskID)
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            let todoListsTasks = state[action.todoListID]
            state[action.todoListID] = todoListsTasks.map(t => t.id === action.taskID ? {
                ...t,
                status: action.status
            } : t)
            return {...state}
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: ITaskDomain = {...action.task, entityStatus: 'idle'}
            stateCopy[action.task.todoListId] = [newTask, ...stateCopy[action.task.todoListId]]
            return stateCopy
        }
        case 'ADD-TODO-LIST': {
            const stateCopy = {...state}
            stateCopy[action.item.id] = []
            return stateCopy
        }
        case 'REMOVE-TODO-LIST': {
            const stateCopy = {...state}
            delete stateCopy[action.todoListID]
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            let todoListsTasks = state[action.todoListID]
            state[action.todoListID] = todoListsTasks.map(t => t.id === action.taskID ? {
                ...t,
                title: action.newValue
            } : t)
            return {...state}
        }
        case 'SET-TODO-LISTS': {
            const stateCopy = {...state}

            action.items.forEach((t) => {
                stateCopy[t.id] = []
            })
            return stateCopy
        }
        case 'SET-TASK-ENTITY':{
            let todoListsTasks = state[action.todoListID]
            state[action.todoListID] = todoListsTasks.map(t => t.id === action.taskID ? {
                ...t,
                entityStatus: action.newValue
            } : t)
            return {...state}

        }
        case 'SET-TASKS': {
            const stateCopy = {...state};
            stateCopy[action.todoListID] = action.tasks.map(t=>({...t, entityStatus: 'idle'}))
            return stateCopy
        }
        default: {
            return state
        }
    }
}

type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof setLoadingStatusAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setTaskEntity>

export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        todoListID,
        taskID
    } as const
}
export const changeTaskStatusAC = (todoListID: string, taskID: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todoListID,
        taskID,
        status
    } as const
}

export const addTaskAC = (task: ITask) => {
    return {
        type: 'ADD-TASK',
        task
    } as const
}

export const changeTaskTitleAC = (todoListID: string, taskID: string, newValue: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todoListID,
        taskID,
        newValue
    } as const
}

export const setTasksAC = (todoListID: string, tasks: ITask[]) => {
    return {
        type: 'SET-TASKS',
        todoListID,
        tasks,
    } as const
}
export const setTaskEntity = (todoListID: string, taskID: string, newValue: RequestStatusType) =>{
    return{
        type: 'SET-TASK-ENTITY',
        todoListID,
        taskID,
        newValue
    } as const
}


//thunk

export const fetchTasksTC = (todoListID: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setLoadingStatusAC('loading'))
        todoListsAPI.getTasks(todoListID)
            .then((res) => {
                const tasks = res.data.items;
                dispatch(setTasksAC(todoListID, tasks))
                setTimeout(() => dispatch(setLoadingStatusAC('succeeded')), 300)
            })
    }
}
//
export const removeTaskTC = (todoListID: string, taskID: string) => {
    return async (dispatch: Dispatch<ActionsType>) => {
        dispatch(setLoadingStatusAC('loading'))
        dispatch(setTaskEntity(todoListID, taskID, 'loading'))
        todoListsAPI.deleteTask(todoListID, taskID)
            .then((res) => {
                    if (res.data.resultCode === 0) {
                        const action = removeTaskAC(todoListID, taskID)
                        dispatch(action)
                        setTimeout(() => dispatch(setLoadingStatusAC('succeeded')), 300)
                        dispatch(setTaskEntity(todoListID, taskID, 'succeeded'))
                    }

                }
            )
            .catch((error) => {
                handleServerNetworkError(dispatch, error)
            })
    }
}
//server error
export const addTaskTC = (todoListID: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setLoadingStatusAC('loading'))
        todoListsAPI.createTask(todoListID, title)
            .then((res) => {
                if (res.data.resultCode === ResultCodes.Success) {
                    dispatch(addTaskAC(res.data.data.item))
                    setTimeout(() => dispatch(setLoadingStatusAC('succeeded')), 300)
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(dispatch, error)
            })
    }
}
//default
export const updateTaskStatusTC = (todoListID: string, taskID: string, status: TaskStatuses) => {
    return (dispatch: Dispatch<ActionsType>, getState: () => AppStateType) => {
        dispatch(setLoadingStatusAC('loading'))
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodoList = allTasksFromState[todoListID]
        const task = tasksForCurrentTodoList.find(t => t.id === taskID)
        if (task) {
            todoListsAPI.updateTask(todoListID, taskID, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status,
            }).then(() => {
                const action = changeTaskStatusAC(todoListID, taskID, status)
                dispatch(action)
                setTimeout(() => dispatch(setLoadingStatusAC('succeeded')), 300)
            })
                .catch((error) => {
                    handleServerNetworkError(dispatch, error)
                })
        }
    }
}
//default
export const updateTaskTitleTC = (todoListID: string, taskID: string, title: string) => {

    return (dispatch: Dispatch<ActionsType>, getState: () => AppStateType) => {
        dispatch(setLoadingStatusAC('loading'))
        const allTasksFromState = getState().tasks
        const tasksForCurrentTodoList = allTasksFromState[todoListID]
        const task = tasksForCurrentTodoList.find(t => t.id === taskID)
        if (task) {
            todoListsAPI.updateTask(todoListID, taskID, {
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
            })
                .then((res) => {
                    if (res.data.resultCode === ResultCodes.Success) {
                        const action = changeTaskTitleAC(todoListID, taskID, title)
                        dispatch(action)
                        setTimeout(() => dispatch(setLoadingStatusAC('succeeded')), 300)
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }

                })
                .catch((e) => {
                    handleServerNetworkError(dispatch, e)
                })
        }
    }
}