import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../../api/todolists-api";
import {ResultCodes} from "../../api/types";
import {authActions} from "../Auth";
import {handleAsyncServerAppError} from "../../utils/error-utils";

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
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{ error: null | string }>) {
            state.error = action.payload.error
        }
    },
    extraReducers: builder => {
        builder
            .addCase(initializeAppTC.fulfilled, (state) => {
                state.isInitialized = true
            })
    }

})


//
// export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':{
//             return {...state, error: action.error}
//         }
//         default:
//             return state
//     }
// }
//
//
// export const setLoadingStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
// export const setErrorAC = (error: string| null) =>({type: 'APP/SET-ERROR', error}as const)
// export type AppActionsType = ReturnType<typeof setLoadingStatusAC>
// | ReturnType<typeof setErrorAC>