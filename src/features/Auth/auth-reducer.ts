import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginPayload} from "../../api/todolists-api";
import {ThunkError} from "../../utils/types";
import {FieldErrorType, ResultCodes} from "../../api/types";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {clearDATA} from "../TodoListLists/todoListReducer";
import {appActionsCommon} from "../CommonActions/App";

const initialState = {
    isLoggedIn: false as boolean,
}
const {setAppStatus} = appActionsCommon;
const logInTC = createAsyncThunk<void, LoginPayload, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>('auth/logIn', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        let response = await authAPI.logIn(param)
        if (response.data.resultCode === ResultCodes.Success) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
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
const logOutTC = createAsyncThunk<void, void, ThunkError>('auth/logOut', async (_, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))

    try {
        let data = await authAPI.logOut()
        if (data.resultCode === ResultCodes.Success) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            //data clean
            thunkAPI.dispatch(clearDATA())
            //
            return
        } else {
            return handleAsyncServerAppError(data, thunkAPI)
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
export const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload
        },
    },
    extraReducers: builder => builder
        .addCase(logInTC.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        .addCase(logOutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        })
})
export const asyncActions = {
    logOutTC,
    logInTC
}