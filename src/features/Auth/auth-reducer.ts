import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "../Application";
import {authAPI, LoginPayload} from "../../api/todolists-api";
import {ThunkError} from "../../utils/types";
import {FieldErrorType, ResultCodes} from "../../api/types";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {clearDATA} from "../TodoListLists/todoListReducer";

const initialState = {
    isLoggedIn: false as boolean,
}
const {setAppStatus} = appActions;
const logInTC = createAsyncThunk<void, LoginPayload, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } } >('auth/logIn', async (param,thunkAPI)=>{
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try{
        let response = await authAPI.logIn(param)
        if(response.data.resultCode === ResultCodes.Success){
            thunkAPI.dispatch(setAppStatus({status:'succeeded'}))
            return
        }else{
            return handleAsyncServerAppError(response.data, thunkAPI)
        }
    }
    catch (e){
        if (e instanceof AxiosError) {
            // ✅ TypeScript knows err is AxiosError
            return handleAsyncServerNetworkError(e, thunkAPI)
        } else {
            console.error(e)
        }
    }
})
const logOutTC = createAsyncThunk<void, void, ThunkError>('auth/logOut', async (_,thunkAPI)=>{
    thunkAPI.dispatch(setAppStatus({status: "loading"}))

    try{
        let data = await authAPI.logOut()
        if(data.resultCode === ResultCodes.Success){
            thunkAPI.dispatch(setAppStatus({status:'succeeded'}))
            //data clean
            thunkAPI.dispatch(clearDATA())
            //
            return
        }else{
            return handleAsyncServerAppError(data, thunkAPI)
        }
    }
    catch (e){
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
        setIsLoggedIn(state, action: PayloadAction<boolean>){
            state.isLoggedIn = action.payload
        },
    },
    extraReducers: builder => builder
        .addCase(logInTC.fulfilled, (state) =>{
            state.isLoggedIn = true
        })
        .addCase(logOutTC.fulfilled, (state) =>{
            state.isLoggedIn = false
        })
})
export const asyncActions = {
    logOutTC,
    logInTC
}
// export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'login/SET-IS-LOGGED-IN':
//             return {...state, isLoggedIn: action.value}
//         case 'login/SET-IS-INITIALIZED':{
//             return {...state, isInitialized: action.value}
//         }
//         default:
//             return state
//     }
// }
//
// // actions
// export const setIsLoggedInAC = (value: boolean) =>
//     ({type: 'login/SET-IS-LOGGED-IN', value} as const)
// export const setIsInitializedAC = (value: boolean) =>
//     ({type: 'login/SET-IS-INITIALIZED', value} as const)
//
//
// // thunks
// export const meTC = () => (dispatch: Dispatch<ActionsType>) => {
//     dispatch(setLoadingStatusAC('loading'))
//     authAPI.me()
//         .then((data)=>{
//             if(data.resultCode === ResultCodes.Success ){
//                 dispatch(setIsLoggedInAC(true))
//                 dispatch(setLoadingStatusAC('succeeded'))
//                 dispatch(setIsInitializedAC(true))
//
//             }else if(data.resultCode === ResultCodes.Error){
//                 dispatch(setIsLoggedInAC(false))
//                 dispatch(setLoadingStatusAC('succeeded'))
//                 dispatch(setIsInitializedAC(true))
//
//             }
//             else{
//                 handleServerAppError(data, dispatch)
//             }
//         })
//         .catch((e)=>{
//             const error = e.response? e.response: e
//             handleServerNetworkError(dispatch, error)
//         })
// }
// export const loginTC = (data: LoginPayload) => (dispatch: Dispatch<ActionsType>) => {
//     dispatch(setLoadingStatusAC('loading'))
//     authAPI.logIn(data)
//         .then((data)=>{
//             if(data.resultCode === ResultCodes.Success ){
//                 dispatch(setIsLoggedInAC(true))
//                 setTimeout(() => dispatch(setLoadingStatusAC('succeeded')), 300)
//             }
//             else{
//                 handleServerAppError(data, dispatch)
//             }
//         })
//         .catch((e)=>{
//             const error = e.response? e.response: e
//             handleServerNetworkError(dispatch, error)
//         })
// }
// export const logoutTC = () => (dispatch: Dispatch<ActionsType>) =>{
//     dispatch(setLoadingStatusAC('loading'))
//     authAPI.logOut().then((res)=>{
//         if(res.data.resultCode === ResultCodes.Success){
//             dispatch(setIsLoggedInAC(false))
//             setTimeout(() => dispatch(setLoadingStatusAC('succeeded')), 300)
//         } else {
//             handleServerAppError(res.data, dispatch)
//         }
//     })
//         .catch((e)=>{
//             const error = e.response? e.response:e
//             handleServerNetworkError(dispatch, error)
//         })
// }
// // types
// type ActionsType = ReturnType<typeof setIsLoggedInAC>
//     | ReturnType<typeof setLoadingStatusAC>
//     | ReturnType<typeof setErrorAC>
//     | ReturnType<typeof setIsInitializedAC>
