import {AnyAction, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {todoListReducer} from "../reducers/todoListReducer";
import {tasksReducer} from "../reducers/tasksReducer";
import {loadState, saveState} from "../../common/utils/localstorage-utils";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

export type AppStateType = ReturnType<typeof reducers>;

const reducers = combineReducers({
    todoList: todoListReducer,
    tasks: tasksReducer,
})

export let store = legacy_createStore(reducers, loadState(),applyMiddleware(thunk));

export type AppThunkDispatchType = ThunkDispatch<AppStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatchType>()


store.subscribe(()=>{
    saveState({
        todoList: store.getState().todoList,
        tasks: store.getState().tasks,
    })
})
export type StoreType = typeof store;

//@ts-ignore
window.store = store