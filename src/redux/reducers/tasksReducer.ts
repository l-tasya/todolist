import {v1} from "uuid";
import { todoList1, todoList2 } from "./todoListReducer";
//tasks
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = TaskType[]
export type AllTasksType = {
    [key: string]: TasksType,
}

type StateType = AllTasksType

const initialState: StateType = {
    [todoList1]: [
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "Redux", isDone: true},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "Promises", isDone: true},
        {id: v1(), title: "Thunk", isDone: true},
        {id: v1(), title: "GraphQL", isDone: true},
    ],
    [todoList2]: [
        {id: v1(), title: "Metro", isDone: false},
        {id: v1(), title: "Death Stranding", isDone: true},
    ]
}

export const tasksReducer = (state: StateType = initialState, action: any): StateType => {
    switch (action) {
        default: {
            return state
        }
    }
}