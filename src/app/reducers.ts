import {combineReducers} from "@reduxjs/toolkit";
import { appReducer } from "../features/Application";
import { authReducer } from "../features/Auth";
import {tasksReducer, todoListReducer} from "../features/TodoListLists";


export const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    todoList: todoListReducer,
    tasks: tasksReducer

})