import { tasksReducer } from "../state/tasksReducer"
import { todolistReducer } from "../state/todolistReducer"
import {combineReducers, createStore} from 'redux'

const reducers = combineReducers({
    todoList: todolistReducer,
    tasks: tasksReducer
})


export let store = createStore(reducers);
export type StoreType = typeof store;
// @ts-ignore
window.store = store;
export type AppStateType = ReturnType<typeof reducers>;
