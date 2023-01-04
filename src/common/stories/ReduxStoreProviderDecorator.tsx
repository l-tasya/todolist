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

const initGlobalState = {
    todoList: [
        {id: "todoID1", title: "Games", filter: "all"},
        {id: "todoID2", title: "Films", filter: "all"},
    ],
    tasks: {
        ["todoID1"]: [
            {id: "1", title: "Metro", isDone: false}
        ],
        ["todoID2"]: [
            {id: "1", title: "Wolf from Wall st.", isDone: true}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initGlobalState as AppStateType)
export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}>
        {story()}
    </Provider>
}