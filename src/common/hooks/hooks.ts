import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store/store";

export type AppThunkDispatchType = ThunkDispatch<AppStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatchType>()

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
