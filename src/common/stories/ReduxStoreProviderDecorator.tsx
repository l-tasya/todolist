import {Provider} from "react-redux";
import {AppStateType} from "../../redux/store/store";
import React from "react";
import {todoListReducer} from "../../redux/reducers/todoListReducer";
import {tasksReducer} from "../../redux/reducers/tasksReducer";
import {combineReducers, createStore} from "redux";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoList: todoListReducer,
})

const initGlobalState: AppStateType = {
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
        isInitialized: false,
    }
    ,
    app: {
        status: 'succeeded',
        error: null
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

export const storyBookStore = createStore(rootReducer, initGlobalState as AppStateType)
export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}>
        {story()}
    </Provider>
}