import {Provider} from "react-redux";
import React from "react";
import {combineReducers, createStore} from "redux";
import {AppRootState} from "../../utils/types";

import {authReducer} from "../../features/Auth";
import {appReducer} from "../../features/Application";
import {tasksReducer, todoListReducer} from "../../features/TodoListLists";


const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    todoList: todoListReducer,
    tasks: tasksReducer

})
const initGlobalState: AppRootState = {
    todoList: [
        {
            id: "todoID1",
            title: "Games",
            filter: "All",
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        },
        {
            id: "todoID2",
            title: "Films",
            filter: "All",
            addedDate: '',
            order: 1,
            entityStatus: 'idle'
        },
    ],
    auth: {
        isLoggedIn: false,

    }
    ,
    app: {
        status: 'succeeded',
        error: null,
        isInitialized: false,
    },
    tasks: {
        ["todoID1"]: [
            {
                id: "1",
                title: "Metro",
                todoListId: "todoID1",
                status: 0,
                startDate: '',
                addedDate: '',
                deadline: '',
                priority: 0,
                order: 0,
                description: '',
                entityStatus: 'idle'
            }
        ],
        ["todoID2"]: [
            {
                id: "1",
                title: "Wolf from Wall st.",
                todoListId: "todoID2",
                status: 0,
                startDate: '',
                addedDate: '',
                deadline: '',
                priority: 0,
                order: 0,
                description: '',
                entityStatus: 'idle'
            }
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initGlobalState as AppRootState)
export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}>
        {story()}
    </Provider>
}