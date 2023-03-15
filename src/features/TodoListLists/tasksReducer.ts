import {ITaskDomain, TasksReducerType} from "../../common/types/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "../Application/app-reducer";
import {AppRootState, ThunkError} from "../../utils/types";
import {todoListsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {ITask, ResultCodes, TaskPriorities, TaskStatuses} from "../../api/types";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {asyncTodoListActions, clearDATA} from "./todoListReducer";
import {appActionsCommon} from "../CommonActions/App";


const {setAppStatus} = appActionsCommon;


const fetchTasksTC = createAsyncThunk<{ tasks: ITask[], todoListID: string }, string, ThunkError>(
    'task/fetchTasks',
    async (todoListID, thunkAPI) => {
        try {
            const data = await todoListsAPI.getTasks(todoListID)
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
            return {tasks: data.items, todoListID}
        } catch (e) {
            if (e instanceof AxiosError) {
                // ✅ TypeScript knows err is AxiosError
                return handleAsyncServerNetworkError(e, thunkAPI)
            } else {
                console.error(e)
            }
        }
    }
)

const addTaskTC = createAsyncThunk<ITask, { todoListID: string, title: string }, ThunkError>('task/addTask', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))

    try {
        const response = await todoListsAPI.createTask(param.todoListID, param.title)
        if (response.data.resultCode === ResultCodes.Success) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
            return response.data.data.item
        } else {
            handleAsyncServerAppError(response.data, thunkAPI)
        }
    } catch (e) {
        if (e instanceof AxiosError) {
            // ✅ TypeScript knows err is AxiosError
            return handleAsyncServerNetworkError(e, thunkAPI)
        } else {
            console.error(e)
        }
    }
})

const removeTaskTC = createAsyncThunk<{ todoListID: string, taskID: string }, { todoListID: string, taskID: string }, ThunkError>(
    'task/removeTask', async (param, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: "loading"}))
        try {
            const response = await todoListsAPI.deleteTask(param.todoListID, param.taskID)
            if (response.data.resultCode === ResultCodes.Success) {
                thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
                return param
            } else {
                handleAsyncServerAppError(response.data, thunkAPI)
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                // ✅ TypeScript knows err is AxiosError
                return handleAsyncServerNetworkError(e, thunkAPI)
            } else {
                console.error(e)
            }
        }
    })
type Param = { todoListID: string, model: UpdateDomainTaskModelType, taskID: string }
const updateTaskTC = createAsyncThunk<Param, Param>(
    'task/updateTask',
    async (param: Param, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: "loading"}))
        const state = thunkAPI.getState() as AppRootState

        const task = state.tasks[param.todoListID].find(t => t.id === param.taskID)
        if (!task) {
            return thunkAPI.rejectWithValue('task not found')
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...param.model,
        }
        const res = await todoListsAPI.updateTask(param.todoListID, param.taskID, apiModel)
        try {
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
                return param
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                // ✅ TypeScript knows err is AxiosError
                return handleAsyncServerNetworkError(e, thunkAPI)
            } else {
                console.error(e)
            }
        }
    }
)

export const asyncTaskActions = {
    addTaskTC,
    updateTaskTC,
    removeTaskTC,
    fetchTasksTC
}
export const slice = createSlice({
    name: "task",
    initialState: {} as TasksReducerType,
    reducers: {
        changeTaskEntity(state, action: PayloadAction<{ todoListID: string, taskID: string, entity: RequestStatusType }>) {
            const tasks = state[action.payload.todoListID];
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index > -1) {
                tasks[index].entityStatus = action.payload.entity
            }
        },
    },
    extraReducers: builder => builder
        .addCase(asyncTodoListActions.addTodoListTC.fulfilled, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(asyncTodoListActions.removeTodoListTC.fulfilled, (state, action) => {
            delete state[action.payload]
        })
        .addCase(asyncTodoListActions.fetchTodoListsTC.fulfilled, (state, action) => {
            action.payload.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
        .addCase(addTaskTC.fulfilled, (state, action) => {
                let item: ITaskDomain = {...action.payload, entityStatus: "idle"}
                state[action.payload.todoListId].unshift(item)
            }
        )
        .addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todoListID] = action.payload.tasks.map(t => ({...t, entityStatus: "idle"}))
        })
        .addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListID]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
        .addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListID]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })
        .addCase(clearDATA, () => {
            return {}
        })

})
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
