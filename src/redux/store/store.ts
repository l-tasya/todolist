import { combineReducers, createStore } from "redux";
import {todoListReducer} from "../reducers/todoListReducer";
import {tasksReducer} from "../reducers/tasksReducer";




const reducers = combineReducers({
    todoList: todoListReducer,
    tasks: tasksReducer,
})


export let store = createStore(reducers);

//@ts-ignore
window.store = store