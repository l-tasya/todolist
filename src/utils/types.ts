import {store} from '../app/store'
import {rootReducer} from '../app/reducers'
import { FieldErrorType } from '../api/types'


export type RootReducerType = typeof rootReducer
export type AppRootState = ReturnType<RootReducerType>
export type AppDispatch = typeof store.dispatch
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }