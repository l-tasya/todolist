import {todoListsAPI} from '../../api/todolists-api';
import {FilterType, ITodoList, ITodoListDomain, ResultCodes} from '../../api/types';
import {createAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ThunkError} from "../../utils/types";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {RequestStatusType} from '../Application/app-reducer';
import {appActionsCommon} from "../CommonActions/App";


const {setAppStatus} = appActionsCommon;
export const fetchTodoListsTC = createAsyncThunk<ITodoList[], void, ThunkError>(`todolist/fetchTodoLists`, async (_, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
        const response = await todoListsAPI.getTodoLists()
        return response.data
    } catch (e) {
        if (e instanceof AxiosError) {
            // ✅ TypeScript knows err is AxiosError
            return handleAsyncServerNetworkError(e, thunkAPI)
        } else {
            console.error(e)
        }
    }
})
export const addTodoListTC = createAsyncThunk<ITodoList, string, ThunkError>(`todolist/addTodoList`, async (title, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))

    try {
        const response = await todoListsAPI.createTodoList(title)
        if (response.data.resultCode === ResultCodes.Success) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
            debugger
            return response.data.data.item
        } else {
            return handleAsyncServerAppError(response.data, thunkAPI)
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
export const removeTodoListTC = createAsyncThunk<string, string, ThunkError>(`todolist/removeTodoList`, async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const response = await todoListsAPI.deleteTodoList(param)
        if (response.data.resultCode === ResultCodes.Success) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
            return param
        } else {
            return handleAsyncServerAppError(response.data, thunkAPI)
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
export const changeTodoListTitleTC = createAsyncThunk<{ todoListID: string, title: string }, { todoListID: string, title: string }, ThunkError>(`todolist/changeTodoListTitle`, async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const response = await todoListsAPI.updateTodoList(param.todoListID, param.title)
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

export const asyncTodoListActions = {
    changeTodoListTitleTC,
    addTodoListTC,
    removeTodoListTC,
    fetchTodoListsTC
}
export const slice = createSlice({
    name: "todolist",
    initialState: [] as Array<ITodoListDomain>,
    reducers: {
        changeTodolistFilter(state, action: PayloadAction<{ id: string, filter: FilterType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ id: string, entity: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entity
        },

    },
    extraReducers: builder => builder
        .addCase(addTodoListTC.fulfilled, (state, action) => {
            let newTodoList: ITodoListDomain = {...action.payload, entityStatus: "idle", filter: "All"}
            state.unshift(newTodoList)
        })
        .addCase(fetchTodoListsTC.fulfilled, (state, action: PayloadAction<ITodoList[]>) => {
            return action.payload.map(t => ({...t, entityStatus: "idle", filter: "All"}))
        })
        .addCase(removeTodoListTC.fulfilled, (state, action) => {
            return state.filter(t => t.id !== action.payload)
        })
        .addCase(changeTodoListTitleTC.fulfilled, (state, action) => {
            let item = state.find(t => t.id === action.payload.todoListID)
            if (item) {
                item.title = action.payload.title
            }
        })
        .addCase(clearDATA, () => {
            return []
        })
})

export const clearDATA = createAction('clearData');
