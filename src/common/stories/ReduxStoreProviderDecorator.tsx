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
            addedDate: Date,
            order: 0
        },
        {
            id: "todoID2",
            title: "Films",
            filter: "All",
            addedDate: Date,
            order: 1
        },
    ],
    tasks: {
        ["todoID1"]: [
            {
                id: "1",
                title: "Metro",
                completed: false,
                todoListId: "todoID1",
                status: 0,
                startDate: Date,
                addedDate: Date,
                deadline: Date,
                priority: 0,
                order: 0,
                description: ''
            }
        ],
        ["todoID2"]: [
            {
                id: "1",
                title: "Wolf from Wall st.",
                completed: true,
                todoListId: "todoID2",
                status: 0,
                startDate: Date,
                addedDate: Date,
                deadline: Date,
                priority: 0,
                order: 0,
                description: ''
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