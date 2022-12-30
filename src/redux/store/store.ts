import {applyMiddleware, combineReducers, createStore } from "redux";
import {todoListReducer} from "../reducers/todoListReducer";
import {tasksReducer} from "../reducers/tasksReducer";
import {loadState, saveState} from "../../common/utils/localstorage-utils";
import thunk from 'redux-thunk';



const reducers = combineReducers({
    todoList: todoListReducer,
    tasks: tasksReducer,
})

export let store = createStore(reducers, loadState(),applyMiddleware(thunk));

store.subscribe(()=>{
    saveState({
        todoList: store.getState().todoList,
        tasks: store.getState().tasks,
    })
})
export type StoreType = typeof store;
export type AppStateType = ReturnType<typeof reducers>;
//@ts-ignore
window.store = store