import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../../api/todolists-api";
import {ResultCodes} from "../../api/types";
import {authActions} from "../Auth";
import {handleAsyncServerAppError} from "../../utils/error-utils";
import { appActionsCommon } from "../CommonActions/App";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false as boolean,

}

const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, thunkAPI) => {
    let {setIsLoggedIn} = authActions
    const response = await authAPI.me()
    if (response.data.resultCode === ResultCodes.Success) {
        thunkAPI.dispatch(setIsLoggedIn(true))
    } else if (response.data.resultCode === ResultCodes.Error) {
        thunkAPI.dispatch(setIsLoggedIn(false))
    } else {
        return handleAsyncServerAppError(response.data, thunkAPI)
    }
})

export const asyncActions = {
    initializeAppTC
}
export const slice = createSlice({
    name: "app",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(initializeAppTC.fulfilled, (state) => {
                state.isInitialized = true
            })
            .addCase(appActionsCommon.setAppStatus, (state, action: PayloadAction<{status: RequestStatusType}>)=>{
                state.status = action.payload.status
            })
            .addCase(appActionsCommon.setAppError, (state, action: PayloadAction<{error: null | string}>)=>{
                state.error = action.payload.error
            })
    }

})
