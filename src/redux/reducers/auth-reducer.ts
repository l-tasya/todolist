import {Dispatch} from 'redux'
import {setErrorAC, setLoadingStatusAC} from './app-reducer';
import {authAPI, LoginPayload} from '../../api/todolists-api';
import {ResultCodes} from '../../common/types/types';
import {handleServerAppError, handleServerNetworkError} from '../../common/utils/error-utils';

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-IS-INITIALIZED':{
            return {...state, isInitialized: action.value}
        }
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setIsInitializedAC = (value: boolean) =>
    ({type: 'login/SET-IS-INITIALIZED', value} as const)


// thunks
export const meTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    authAPI.me()
        .then((data)=>{
            if(data.resultCode === ResultCodes.Success ){
                dispatch(setIsLoggedInAC(true))
                dispatch(setLoadingStatusAC('succeeded'))
                dispatch(setIsInitializedAC(true))

            }else if(data.resultCode === ResultCodes.Error){
                dispatch(setIsLoggedInAC(false))
                dispatch(setLoadingStatusAC('succeeded'))
                dispatch(setIsInitializedAC(true))

            }
            else{
                handleServerAppError(data, dispatch)
            }
        })
        .catch((e)=>{
            const error = e.response? e.response: e
            handleServerNetworkError(dispatch, error)
        })
}
export const loginTC = (data: LoginPayload) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    authAPI.logIn(data)
        .then((data)=>{
            if(data.resultCode === ResultCodes.Success ){
                dispatch(setIsLoggedInAC(true))
                setTimeout(() => dispatch(setLoadingStatusAC('succeeded')), 300)
            }
            else{
                handleServerAppError(data, dispatch)
            }
        })
        .catch((e)=>{
            const error = e.response? e.response: e
            handleServerNetworkError(dispatch, error)
        })
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) =>{
    dispatch(setLoadingStatusAC('loading'))
    authAPI.logOut().then((res)=>{
        if(res.data.resultCode === ResultCodes.Success){
            dispatch(setIsLoggedInAC(false))
            setTimeout(() => dispatch(setLoadingStatusAC('succeeded')), 300)
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch((e)=>{
            const error = e.response? e.response:e
            handleServerNetworkError(dispatch, error)
        })
}
// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setLoadingStatusAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setIsInitializedAC>
