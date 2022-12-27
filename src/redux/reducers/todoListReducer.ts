import {todoList1, todoList2, TodoListsType} from "../../App";

export type FilterType = "All" | "Completed" | "Active"
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TodoListsType = TodoListType[]
export type TodoListsStateType = TodoListsType
type StateType = TodoListsType

export const todoList1 = v1()
export const todoList2 = v1()
const initialState: StateType = [
    {id: todoList1, title: "What to Learn", filter: "All"},
    {id: todoList2, title: "What to Play", filter: "Completed"},
]

export const todoListReducer = (state: StateType = initialState, action: any):StateType =>{
    switch(action){
        default:{
            return state
        }
    }
}